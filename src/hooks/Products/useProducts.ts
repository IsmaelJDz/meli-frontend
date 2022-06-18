import { useQuery, FetchQueryOptions } from "react-query";
import { fetchData } from "@/utils/common";

import { SerializedData } from "@/interfaces/serialized-data";

export const useProducts = (term = "") => {
  return useQuery<SerializedData>(
    ["products", term],
    async () => {
      return fetchData(`products/items?search=${term}`).then(
        response => response.data
      );
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  );
};
