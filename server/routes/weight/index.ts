import {Router} from 'express';
import z from "zod";

import {prisma} from "../../prisma";
import {authenticateUser} from "../../middleware/auth";

const router = Router();

router.use(authenticateUser);

router.get('/', async (req, res) => {
  const uid = res.locals.user.uid;
  try {
    const records = await prisma.weight.findMany({
      where: {
        uid: uid,
      },
      select: {
        weight: true,
        date: true,
        id: true,
      },
    });

    return res.status(201).json({records});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong fetching the records"});
  }
});

router.post('/', async (req, res) => {
  const uid = res.locals.user.uid;

  const {weight} = postWeightPayload.parse(req.body);

  try {
    const record = await prisma.weight.create({
      data: {
        weight: weight,
        uid: uid,
      },
    });

    return res.status(201).json({record});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong creating the record"});
  }
});

router.delete('/', async (req, res) => {
  const {id} = deleteWeightPayload.parse(req.body);
  try {
    const records = await prisma.weight.delete({
      where: {
        id: id,
      },
    });

    return res.status(201).json({records});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong deleting your record"});
  }
});

router.patch('/', async (req, res) => {
  const {id, weight} = patchWeightPayload.parse(req.body);
  try {
    const updatedRecord = await prisma.weight.update({
      where: {
        id: id,
      },
      data: {
        weight: weight,
      },
    });

    res.status(201).json({updatedRecord});
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Something went wrong in updating your record"});
  }
});

const deleteWeightPayload = z.object({
  id: z.number()
});

const postWeightPayload = z.object({
  weight: z.number()
});

const patchWeightPayload = z.object({
  id: z.number(),
  weight: z.number(),
});

export default router;