import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { Inter, Alegreya } from "@next/font/google";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "../utils/useUser/useUser";

export const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_npURL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const auth = getAuth(firebaseApp);

const inter = Inter({ subsets: ["latin"] });
const alegreya = Alegreya({ weight: ["400", "500", "700"] });

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  body: {
    fontFamily: `${inter.style.fontFamily}`,
  },

  "h1,h2,h3,h4,h5": {
    fontFamily: `${alegreya.style.fontFamily}`,
    fontWeight: 700,
  },

  form: {
    width: "100%",
  },

  p: {
    margin: "$3 0",
    lineHeight: "$4",
    fontSize: "$3",
    color: "$grey800",
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </QueryClientProvider>
  );
}
