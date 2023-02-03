import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/prisma/db";

interface IWeightPostRequest extends NextApiRequest {
  body: {
    weightId: number;
  };
}

export default async function handler(
  req: IWeightPostRequest,
  res: NextApiResponse
) {
  try {
    const records = await prisma.weight.delete({
      where: {
        id: req.body.weightId,
      },
    });

    return res.status(201).json({ records });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error });
  }
}
