import { firebaseAdmin } from "../../libs/firebase/admin";
import { UserImpl } from "@firebase/auth/internal";

export function getUserByToken(token: UserImpl["accessToken"]) {
  return firebaseAdmin.auth().verifyIdToken(token);
}
