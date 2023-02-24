import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

import { prisma } from "@/prisma/db";
import {
  ICreatedUser,
  IUserPayload,
  IUserSignUpFormValues,
} from "@/utils/types";

interface IRequestBody {
  userDetails: IUserSignUpFormValues;
  user: IUserPayload;
}

interface Req extends NextApiRequest {
  body: z.infer<typeof userPayloadSchema>;
}

export default async function handler(
  req: Req,
  res: NextApiResponse<ICreatedUser>
) {
  const { userDetails, user } = userPayloadSchema.parse(req.body);

  const createdUser = await createUser({ user, userDetails }).then(
    (data) => data
  );

  return res.status(200).json(createdUser);
}

async function createUser({
  userDetails,
  user,
}: IRequestBody): Promise<ICreatedUser> {
  return (await prisma.user.create({
    data: {
      ...userDetails,
      ...user,
    },
    select: {
      photoUrl: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  })) as ICreatedUser;
}

const userPayloadSchema = z.object({
  userDetails: z.object({
    firstName: z.string(),
    lastName: z.string(),
    zipcode: z.string(),
    country: z.string(),
    city: z.string(),
    streetName: z.string(),
  }),
  user: z.object({
    uid: z.string(),
    photoUrl: z.string().nullable(),
    email: z.string(),
  }),
});
