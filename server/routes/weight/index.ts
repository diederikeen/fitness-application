import {Router} from 'express';
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

  try {
    const record = await prisma.weight.create({
      data: {
        weight: req.body.weight,
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
  try {
    const records = await prisma.weight.delete({
      where: {
        id: req.body.weightId,
      },
    });

    return res.status(201).json({records});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong deleting your record"});
  }
});

router.patch('/', async (req, res) => {
  try {
    const updatedRecord = await prisma.weight.update({
      where: {
        id: req.body.id,
      },
      data: {
        weight: req.body.weight,
      },
    });

    res.status(201).json({updatedRecord});
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Something went wrong in updating your record"});
  }
});

export default router;