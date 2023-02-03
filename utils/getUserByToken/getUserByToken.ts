import { UserImpl } from "@firebase/auth/internal";

import { firebaseAdmin } from "../../libs/firebase/admin";

export function getUserByToken(token: UserImpl["accessToken"]) {
  return firebaseAdmin.auth().verifyIdToken(token);
}
