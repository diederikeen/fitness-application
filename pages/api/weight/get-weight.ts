import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../prisma/db";
import { getUserByToken } from "../../../utils/getUserByToken/getUserByToken";

interface IWeightPostRequest extends NextApiRequest {
  query: {
    uid: string;
  };
}

export default async function handler(
  req: IWeightPostRequest,
  res: NextApiResponse
) {
  try {
    const userByToken = await getUserByToken(req.cookies.AccessToken);

    const records = await prisma.weight.findMany({
      where: {
        uid: userByToken.uid,
      },
      select: {
        weight: true,
        date: true,
        id: true,
      },
    });

    return res.status(201).json({ records });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error });
  }
}
