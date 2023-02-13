import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

import { prisma } from "@/prisma/db";
import { getUserByToken } from "@/utils/getUserByToken/getUserByToken";

const payloadSchema = z.object({
  name: z.string(),
  uid: z.string(),
});

interface Req extends NextApiRequest {
  body: z.infer<typeof payloadSchema>;
}

export default async function handler(req: Req, res: NextApiResponse) {
  const userByToken = await getUserByToken(req.cookies.AccessToken);

  try {
    await prisma.folder.create({
      data: {
        uid: userByToken.uid,
        name: req.body.name,
      },
    });

    return res.status(200).json({ message: "Folder created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong, please check logs for more information",
    });
  }

  return res.status(200).json({});
}
