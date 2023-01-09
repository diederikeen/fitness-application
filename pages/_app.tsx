import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { Inter } from "@next/font/google";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_npURL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const auth = getAuth(firebaseApp);

const inter = Inter({ subsets: ["latin"] });

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  body: {
    fontFamily: `${inter.style.fontFamily}`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return <Component {...pageProps} />;
}
