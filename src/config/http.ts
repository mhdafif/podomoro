import axios from "./axios";

const http = async ({
  url = "" as string,
  params = {} as any,
  method = "get",
  data = {},
  headers = {},
  auth = undefined as any,
}) => {
  return await axios({
    url,
    method,
    params,
    data,
    headers,
    auth,
  });
};

export default http;
