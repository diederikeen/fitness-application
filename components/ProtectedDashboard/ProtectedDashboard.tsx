import { styled } from "../../styles/theme";
import Masthead from "../Masthead/Masthead";
import Navigation from "../Navigation/Navigation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useAuth } from "../../utils/useAuth/useAuth";
import { PropsWithChildren } from "react";

export function ProtectedDashboard({ children }: PropsWithChildren) {
  const { user } = useAuth();

  if (user == null) {
    return null;
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Masthead user={user} />
        <Navigation />
        <main role="content">{children}</main>
      </Layout>
    </ProtectedRoute>
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
