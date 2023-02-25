import {Router} from 'express';
import z from 'zod';
import {prisma} from "../../prisma";
import {authenticateUser} from "../../middleware/auth";

const router = Router();

router.use(authenticateUser);

router.post('/', async (req, res) => {
  const uid = res.locals.user.uid;

  const {folderId, name} = postExerciseSchema.parse(req.body);

  try {
    await prisma.exercise.create({
      data: {
        uid: uid,
        name: name,
        folder_id:
          folderId ? parseInt(folderId, 10) : null,
      },
    });
    return res.status(200).json({message: "Exercise created successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong creating your exercise"});
  }
});

const postExerciseSchema = z.object({
  name: z.string(),
  folderId: z.string().nullish(),
});

router.get('/single', async (req, res) => {
  const {id} = getSingleExerciseSchema.parse(req.body);

  try {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id: id,
      }
    });

    return res.status(201).json({exercise});
  } catch (error) {
    console.error(error);
    res.status(501).json({message: "Something went wrong fetching your exercise"});
  }
});

const getSingleExerciseSchema = z.object({
  id: z.number(),
})

export default router;
