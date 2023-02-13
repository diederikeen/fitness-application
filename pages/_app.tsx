import { Alegreya, Inter } from "@next/font/google";
import { globalCss } from "@stitches/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "@/utils/useAuth/useAuth";
import { ToastProvider } from "@/utils/useToast/useToast";

export const inter = Inter({ subsets: ["latin"] });
export const alegreya = Alegreya({ weight: ["400", "500", "700"] });

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
    color: "$textDefault",
    transition: "color 125ms ease",
  },
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
