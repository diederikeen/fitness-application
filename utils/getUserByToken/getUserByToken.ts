import { UserImpl } from "@firebase/auth/internal";

import { firebaseAdmin } from "../../libs/firebase/admin";

export async function getUserByToken(token: UserImpl["accessToken"]) {
  return await firebaseAdmin.auth().verifyIdToken(token);
}
