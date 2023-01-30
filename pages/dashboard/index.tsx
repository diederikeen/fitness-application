import { styled } from "../../styles/theme";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Masthead from "../../components/Masthead/Masthead";
import { useUser } from "../../utils/useUser/useUser";
import { User } from "@firebase/auth";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <ProtectedRoute>
      <Layout>
        <Masthead user={user as User} />
        <Navigation>Navigation</Navigation>
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
  },
});

const Navigation = styled("nav", {
  display: "none",
  gridColumn: "nav",
  gridRow: "content",
  height: "100vh",
  background: "white",
  py: "$3",
  px: "$4",
  // backgroundColor: "$grey100",
  borderRight: "1px solid $grey300",
  "@bp2": {
    display: "block",
  },
});
