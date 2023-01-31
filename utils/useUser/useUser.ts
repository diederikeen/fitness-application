import { auth } from "../../pages/_app";
import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "@firebase/auth";
import { useQuery } from "react-query";
import { ICreatedUser } from "../types";

async function fetchUserByEmail(email: string): Promise<ICreatedUser> {
  return await axios
    .get("/api/user/get-user", {
      params: {
        email,
      },
    })
    .then(({ data }) => data.user);
}

export function useUser() {
  const { currentUser, signOut } = auth;
  const [fbUser, setFbUser] = useState<User | undefined | null>(undefined);
  const [user, setUser] = useState<ICreatedUser | undefined>(undefined);

  const { data, isFetched, isLoading } = useQuery(
    ["user"],
    async () => await fetchUserByEmail(fbUser?.email as string),
    {
      enabled: fbUser !== undefined,
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
    const unsubscribe = auth.onIdTokenChanged((rawUser) => {
      if (rawUser !== null) {
        setFbUser(rawUser);
      } else {
        setFbUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isFetched,
    signOut,
  };
}
