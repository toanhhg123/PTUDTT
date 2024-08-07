import { useQuery } from "@tanstack/react-query";
import { userApi } from "../services/user";
import useGetUser from "./useGetUser";

const useGetUserModel = () => {
  const user = useGetUser();

  const { data, ...rest } = useQuery({
    queryFn: () => userApi.getUserById(Number(user?.id!)),
    queryKey: [userApi.url, user?.id],
    enabled: !!user?.id,
  });

  return {
    user: data?.data.data,
    ...rest,
  };
};

export default useGetUserModel;
