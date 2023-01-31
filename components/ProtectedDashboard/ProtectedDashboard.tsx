import { styled } from "../../styles/theme";
import Masthead from "../Masthead/Masthead";
import Navigation from "../Navigation/Navigation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useUser } from "../../utils/useUser/useUser";
import { PropsWithChildren } from "react";

function ProtectedDashboard({ children }: PropsWithChildren) {
  const { user } = useUser();

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
    py: "$5",
    px: "$9",
    scrollBehavior: "smooth",
    overflow: "scroll",
    width: "100%",

    "@bp2": {
      maxHeight: "calc(100vh - 68px)",
    },

    li: {
      mb: "$6",
    },
  },
});

export default ProtectedDashboard;
