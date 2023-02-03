import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { styled } from "@/styles/theme";
import { useAuth } from "@/utils/useAuth/useAuth";

import Masthead from "../Masthead/Masthead";
import Navigation from "../Navigation/Navigation";

export function ProtectedDashboard({ children }: PropsWithChildren) {
  const { user, isFetched } = useAuth();
  const router = useRouter();

  if (isFetched && user === undefined) {
    void router.push("/login");
  }

  if (user === undefined) {
    return null;
  }

  return (
    <Layout>
      <Masthead user={user} />
      <Navigation />
      <main role="content">{children}</main>
    </Layout>
  );
}

const Layout = styled("div", {
  display: "grid",
  gridTemplateColumns: "[content] 1fr",
  gridTemplateRows: "[masthead] 76px [content] auto",

  "@bp2": {
    gridTemplateColumns: "[nav] 260px [content] auto",
    gridTemplateRows: "[masthead] 76px [content] auto",
    maxHeight: "100vh",
    overflow: "hidden",
  },

  main: {
    py: "$3",
    px: "$4",
    scrollBehavior: "smooth",
    overflow: "scroll",
    width: "100%",
    backgroundColor: "$secondaryBg",

    "@bp2": {
      py: "$6",
      px: "$7",
      maxHeight: "calc(100vh - 76px)",
    },

    "@bp3": {
      py: "$7",
      px: "$9",
    },

    li: {
      mb: "$6",
    },
  },
});
