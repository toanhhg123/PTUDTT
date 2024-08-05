import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { brandApi } from "../services/brand";

export default function useGetBrand() {
  const query = useQuery({
    queryFn: () => brandApi.gets(),
    queryKey: [brandApi.url],
  });

  return {
    ...query,
    brandMap: _.keyBy(query.data?.data.data || [], "id"),
  };
}
