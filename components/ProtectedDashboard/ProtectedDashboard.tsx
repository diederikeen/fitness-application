import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import Masthead from "../Masthead/Masthead";
import Navigation from "../Navigation/Navigation";
import { useAuth } from "../../utils/useAuth/useAuth";
import { styled } from "../../styles/theme";

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
  gridTemplateRows: "[masthead] 68px [content] auto",

  "@bp2": {
    gridTemplateColumns: "[nav] 260px [content] auto",
    gridTemplateRows: "[masthead] 68px [content] auto",
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
      maxHeight: "calc(100vh - 68px)",
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
