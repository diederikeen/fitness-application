import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/prisma/db";
import { getUserByToken } from "@/utils/getUserByToken/getUserByToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getUserByToken(req.cookies.AccessToken);
  try {
    const folders = await prisma.folder.findMany({
      where: {
        uid: user.uid,
      },
      select: {
        id: true,
        name: true,
        exercises: true,
      },
    });
    return res.status(200).json({ folders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong, please check logs for more information",
    });
  }
}
