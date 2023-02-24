require('dotenv').config();

import firebaseAdmin from "firebase-admin";
// get this JSON from the Firebase board
// you can also store the values in environment variables
import * as serviceAccount from "./secret.json";

if (firebaseAdmin.apps.length < 1) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: process.env.FB_PROJECT_ID,
    }),
    databaseURL: process.env.FB_DATABASE_npURL,
  });
}

export {firebaseAdmin};
