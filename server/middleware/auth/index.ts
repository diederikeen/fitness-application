import {firebaseAdmin} from "../../firebase";

export async function authenticateUser(req: any, res: any, next: any) {
  try {
    const accessToken = req.cookies.AccessToken;
    const user = await firebaseAdmin.auth().verifyIdToken(accessToken);

    if (user) {
      res.locals.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Authentication token is invalid."})
  }
}