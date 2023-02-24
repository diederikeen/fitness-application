import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/prisma/db";
import { getUserByToken } from "@/utils/getUserByToken/getUserByToken";

interface RequestProps extends NextApiRequest {
  query: {
    email: string;
  };
  cookies: {
    AccessToken: string;
  };
}

export default async function handler(req: RequestProps, res: NextApiResponse) {
  const userByToken = await getUserByToken(req.cookies.AccessToken);

  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: userByToken.uid,
      },
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
    });
  }
}
