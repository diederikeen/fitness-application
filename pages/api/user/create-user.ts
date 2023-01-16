// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import {
  ICreatedUser,
  IUserPayload,
  IUserSignUpFormValues,
} from "../../../utils/types";
import { prisma } from "../../../prisma/db";

interface IRequestBody {
  userDetails: IUserSignUpFormValues;
  user: IUserPayload;
}

interface ReqProps extends NextApiRequest {
  body: IRequestBody;
}

export default async function handler(
  req: ReqProps,
  res: NextApiResponse<ICreatedUser>
) {
  const { user, userDetails } = req.body;
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
