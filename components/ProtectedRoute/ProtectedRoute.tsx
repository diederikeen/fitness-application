import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../utils/useAuth/useAuth";

function ProtectedRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user === null) {
      void router.push({
        pathname: "/login",
      });
    }
  }, [user, isLoading]);

  if (user == null && isLoading) {
    return <div>loading</div>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
