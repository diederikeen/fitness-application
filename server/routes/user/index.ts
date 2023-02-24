import {Router} from "express";
import z from "zod";

import {prisma} from "../../prisma";
import {authenticateUser} from "../../middleware/auth";

const router = Router()

router.use(authenticateUser);

router.get('/', async (req, res) => {

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: res.locals.user.email
      }
    });

    return res.status(200).json({user});
  } catch (error) {
    // @TODO create generic error handler
    return res.status(500).json({
      message: "Something went wrong"
    })
  }
});

router.post('/', async (req, res) => {
  const {userDetails, user} = createUserPayloadSchema.parse(req.body);

  const createdUser = prisma.user.create({
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
  })

  return res.json({user: createdUser})
});

const createUserPayloadSchema = z.object({
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

const createUserPayloadSchema = z.object({
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

router.post('/', async (req, res) => {
  const {userDetails, user} = createUserPayloadSchema.parse(req.body);

  const createdUser = prisma.user.create({
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
  })


  return res.json({user: createdUser})

})

export default router;