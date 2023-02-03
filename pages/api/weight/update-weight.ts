import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/prisma/db";

interface ReqProps extends NextApiRequest {
  body: {
    id: number;
    weight: number;
  };
}

export default async function handler(req: ReqProps, res: NextApiResponse) {
  try {
    const updatedRecord = await prisma.weight.update({
      where: {
        id: req.body.id,
      },
      data: {
        weight: req.body.weight,
      },
    });

    res.status(201).json({ updatedRecord });
  } catch (error) {
    res.status(500).json({ error });
  }

  return res;
}
