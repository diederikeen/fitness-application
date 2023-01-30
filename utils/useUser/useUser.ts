import { auth } from "../../pages/_app";
import { useEffect, useState } from "react";

export function useUser() {
  const { currentUser, signOut } = auth;
  const [user, setUser] = useState<typeof currentUser | undefined>(currentUser);

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged((rawUser) => {
      if (rawUser !== null) {
        setUser(rawUser);
      } else {
        setUser(undefined);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signOut,
  };
}
