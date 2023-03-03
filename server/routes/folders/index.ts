import {Router} from "express";
import z from "zod";

import {authenticateUser} from "../../middleware/auth";
import {prisma} from "../../prisma";

const router = Router();

router.use(authenticateUser);

router.get('/', async (req, res) => {
  const uid = res.locals.user.uid;

  try {
    const folders = await prisma.folder.findMany({
      where: {
        uid: uid,
      },
      select: {
        id: true,
        name: true,
        exercises: true,
      },
    });
    return res.status(200).json({folders});
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Something went wrong with fetching your folder"});
  }
});

router.post('/', async (req, res) => {
  const uid = res.locals.user.uid;

  const {name} = postFolderSchema.parse(req.body);

  try {
    await prisma.folder.create({
      data: {
        uid: uid,
        name: name,
      },
    });

    return res.status(200).json({message: "Folder created successfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong with creating your folder"});
  }
});

const postFolderSchema = z.object({
  name: z.string(),
});


router.get('/single', async (req, res) => {
  const {id} = getSingleFolderSchema.parse(req.query);

  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      select: {
        id: true,
        name: true,
        exercises: true,
      },
    });
    return res.status(200).json({folder});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Something went wrong fetching your folder"})
  }
})

const getSingleFolderSchema = z.object({
  id: z.string(),
})

export default router;