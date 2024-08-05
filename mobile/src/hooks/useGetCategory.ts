import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "../services/category";
import _ from "lodash";

export default function useGetCategory() {
  const query = useQuery({
    queryFn: () => categoryApi.gets(),
    queryKey: [categoryApi.url],
  });

  return {
    ...query,
    categoryMap: _.keyBy(query.data?.data.data || [], "id"),
    categories: query.data?.data.data || [],
  };
}
