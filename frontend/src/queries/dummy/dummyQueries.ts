import {
  type UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import type { IDummyData } from "./IDummy";
import { QryKeyDummy } from "./KDummy";

import { add, fetch, update } from "@/services/apiBanner";

const queryLoadDummy = (): UseQueryResult<IDummyData> => {
  return useQuery({
    queryKey: [QryKeyDummy.getDummyList],
    queryFn: fetch,
  });
};

const queryAddDummy = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QryKeyDummy.addDummy],
    mutationFn: (payload: any) => add(payload),
    // onSuccess: (_data) => {
    // queryClient.removeQueries({
    //   queryKey: [QryKeyDummy.get],
    //   exact: true,
    // });
    // queryClient.invalidateQueries({
    //   queryKey: [QryKeyDummy.get],
    //   exact: true,
    // });
    // },
    // onError: (error) => {
    //   console.log("error di query", error);
    // },
  });
};

const queryUpdateDummy = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QryKeyDummy.updateDummy],
    mutationFn: (payload: any) => update(payload),
    // onSuccess: (_data) => {
    // queryClient.removeQueries({
    //   queryKey: [QryKeyDummy.get],
    //   exact: true,
    // });
    // queryClient.invalidateQueries({
    //   queryKey: [QryKeyDummy.get],
    //   exact: true,
    // });
    // },
  });
};

export { queryLoadDummy, queryAddDummy, queryUpdateDummy };
