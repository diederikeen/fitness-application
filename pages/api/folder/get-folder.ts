import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: parseInt(req.query.folderId as string, 10),
      },
      select: {
        id: true,
        name: true,
        exercises: true,
      },
    });
    return res.status(200).json({ folder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong, please check logs for more information",
    });
  }
}
