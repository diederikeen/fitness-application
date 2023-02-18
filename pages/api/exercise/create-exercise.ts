import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

import { prisma } from "@/prisma/db";
import { getUserByToken } from "@/utils/getUserByToken/getUserByToken";

const payloadSchema = z.object({
  name: z.string(),
  folderId: z.string().nullable(),
});

interface Req extends NextApiRequest {
  body: z.infer<typeof payloadSchema>;
}

export default async function handler(req: Req, res: NextApiResponse) {
  const userByToken = await getUserByToken(req.cookies.AccessToken);
  const body = payloadSchema.parse(req.body);

  try {
    await prisma.exercise.create({
      data: {
        uid: userByToken.uid,
        name: body.name,
        folder_id:
          body.folderId != null ? parseInt(body.folderId, 10) : undefined,
      },
    });

    return res.status(200).json({ message: "Exercise created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong, please check logs for more information",
    });
  }

  return res.status(200).json({});
}
