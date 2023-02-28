import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

import { styled } from "@/styles/theme";
import { ICreatedUser } from "@/utils/types";
import { useAuth } from "@/utils/useAuth/useAuth";

import Masthead from "../Masthead/Masthead";
import Navigation from "../Navigation/Navigation";

export function ProtectedDashboard({ children }: PropsWithChildren) {
  const { user: authUser, isFetched } = useAuth();
  const [user, setUser] = useState<ICreatedUser | undefined>(authUser);
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      setUser(authUser);
    }
  }, [isFetched, authUser]);

  if (isFetched && authUser === undefined) {
    router.push("/login");
  }

  if (user === undefined || user === null) {
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
