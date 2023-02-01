import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

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
    const records = await prisma.weight.findMany({
      where: {
        uid: req.query.uid,
      },
      select: {
        weight: true,
        date: true,
      },
    });

    return res.status(201).json({ records });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error });
  }
}
