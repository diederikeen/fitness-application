import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/prisma/db";
import { getUserByToken } from "@/utils/getUserByToken/getUserByToken";

interface IWeightPostRequest extends NextApiRequest {
  body: {
    weight: number;
    uid: string;
  };
}

export default async function handler(
  req: IWeightPostRequest,
  res: NextApiResponse
) {
  const userByToken = await getUserByToken(req.cookies.AccessToken);

  try {
    const record = await prisma.weight.create({
      data: {
        weight: req.body.weight,
        uid: userByToken.uid,
      },
    });

    return res.status(201).json({ record });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error });
  }
}
