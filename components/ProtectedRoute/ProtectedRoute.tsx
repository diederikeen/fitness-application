import { PropsWithChildren, useEffect } from "react";
import { useUser } from "../../utils/useUser/useUser";
import { useRouter } from "next/router";

function ProtectedRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user === null) {
      void router.push({
        pathname: "/",
      });
    }
  }, [user]);

  return <>{children}</>;
}

export default ProtectedRoute;
