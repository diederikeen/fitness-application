import {Router} from "express";
import {prisma} from "../../prisma";
import {firebaseAdmin} from "../../firebase";

const router = Router()

//@TODO extract to custom middleware
router.use(async (req, res, next) => {
  try {
    const accessToken = req.cookies.AccesToken;
    await firebaseAdmin.auth().verifyIdToken(accessToken)
    next();
  } catch (error) {
    return res.status(500).json({message: "User not found"})
  }
});

router.get('/', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: "diederikeen@gmail.com"
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

export default router;