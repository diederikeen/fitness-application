import { User } from "@firebase/auth";
import axios from "axios";
import nookies from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";

import { auth } from "@/libs/firebase";

import { ICreatedUser } from "../types";

interface IUserContext {
  user: ICreatedUser | undefined;
  signOut: any;
  isLoading: boolean;
  isFetched: boolean;
}

const AuthContext = createContext<IUserContext>({
  user: undefined,
  signOut: () => undefined,
  isLoading: false,
  isFetched: false,
});

async function fetchUserByEmail(email: string): Promise<ICreatedUser> {
  return await axios
    .get("/api/user/get-user", {
      params: {
        email,
      },
    })
    .then(({ data }) => {
      return data.user;
    });
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, signOut } = auth;
  const [fbUser, setFbUser] = useState<User | undefined | null>(null);
  const [isFetched, setIsFetched] = useState(false);
  const [user, setUser] = useState<ICreatedUser | undefined>(undefined);

  const { data, isLoading } = useQuery(
    ["user"],
    async () => {
      return await fetchUserByEmail(fbUser?.email as string);
    },
    {
      enabled: fbUser !== undefined && fbUser !== null,
    }
  );

  useEffect(() => {
    if (data !== undefined && user === undefined) {
      setUser(data);
      setIsFetched(true);
    }
  }, [fbUser, data]);

  useEffect(() => {
    if (currentUser !== null && fbUser === undefined) {
      setFbUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const unsubscribe = auth.onIdTokenChanged(async (rawUser) => {
      if (rawUser !== null) {
        const token = await rawUser.getIdToken();
        setFbUser(rawUser);
        nookies.set(undefined, "AccessToken", token, { path: "/api" });
      } else {
        setFbUser(null);
        nookies.set(undefined, "AccessToken", "", { path: "/api" });
      }
    });
    return () => unsubscribe();
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user != null) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isFetched,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const { user, isLoading, isFetched, signOut } = useContext(AuthContext);

  return {
    user,
    isLoading,
    isFetched,
    signOut,
  };
}
