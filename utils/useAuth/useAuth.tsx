import { auth } from "../../pages/_app";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { User } from "@firebase/auth";
import { useQuery } from "react-query";
import nookies from "nookies";

import { ICreatedUser } from "../types";

import { auth } from "../../libs/firebase";

async function fetchUserByEmail(email: string): Promise<ICreatedUser> {
  return await axios
    .get("/api/user/get-user", {
      params: {
        email,
      },
    })
    .then(({ data }) => data.user);
}

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser, signOut } = auth;
  const [fbUser, setFbUser] = useState<User | undefined | null>(null);
  const [user, setUser] = useState<ICreatedUser | undefined>(undefined);

  const { data, isFetched, isLoading } = useQuery(
    ["user"],
    async () => await fetchUserByEmail(fbUser?.email as string),
    {
      enabled: fbUser !== undefined && fbUser !== null,
    }
  );

  useEffect(() => {
    if (data !== undefined && user === undefined) {
      setUser(data);
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
