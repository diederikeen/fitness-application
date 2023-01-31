import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

interface RequestProps extends NextApiRequest {
  query: {
    email: string;
  };
}

export default async function handler(req: RequestProps, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.query.email,
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
