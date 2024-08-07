import { useEffect, useState } from "react";
import { UserToken } from "../types/user";
import { authApi } from "../services/auth";

export default function useGetUser() {
  const [user, setUser] = useState<UserToken | null>(null);

  useEffect(() => {
    authApi.getStore().then(setUser);
  }, []);

  return user;
}
