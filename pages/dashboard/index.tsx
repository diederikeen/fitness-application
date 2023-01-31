import { styled } from "../../styles/theme";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Masthead from "../../components/Masthead/Masthead";
import Navigation from "../../components/Navigation/Navigation";

import { useUser } from "../../utils/useUser/useUser";
import { ICreatedUser } from "../../utils/types";

export default function Dashboard() {
  const { user } = useUser();
  return (
    <ProtectedRoute>
      <Layout>
        <Masthead user={user as ICreatedUser} />
        <Navigation />
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
