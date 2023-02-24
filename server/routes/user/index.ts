import {Router} from "express";
import {prisma} from "../../prisma";

const router = Router()

//@TODO extract to custom middleware
router.use((req, res, next) => {
  console.log('implement auth');
  next();
});

router.get('/', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: "diederikeen@gmail.com"
    }
  });

  res.send(user);
});

export default router;