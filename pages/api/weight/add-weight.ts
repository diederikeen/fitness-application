import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

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
  try {
    const record = await prisma.weight.create({
      data: {
        weight: req.body.weight,
        uid: req.body.uid,
      },
    });

    return res.status(201).json({ record });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error });
  }
}
