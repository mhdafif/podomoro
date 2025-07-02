// import { IPromo } from "@/queries/banner/IBanner";
import http from "@/config/http";

const Api = {
  get: "/v1/api/dummy",
} as const;

const fetch = async () => {
  const response = await http({
    url: Api.get,
  });
  return response.data.data;
};
// fetch to concat (can applied to infinite scroll)
// const fetchPromoBanner = async () => {
//   const response = await http({
//     url: ApiBanner.getPromoBanner,
//   });
//   const { data } = response.data;
//   const promotions = data.promotions.map((item: Omit<IPromo, "type">) => ({
//     ...item,
//     type: "PROMO",
//   }));
//   const promoBanner = promotions.concat(data.banner);
//   return { ...response.data.data, promoBanner };
// };

const add = async (payload: any) => {
  const response = await http({
    method: "post",
    url: Api.get,
    data: payload,
  });
  return response.data;
};
const update = async (payload: any) => {
  const response = await http({
    method: "patch",
    url: Api.get,
    data: payload,
  });
  return response.data;
};

export { Api, fetch, add, update };
