import axios from "axios";

const defaultURL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: defaultURL,
  timeout: 20000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    // const token = useConfigStore.getState().token;
    // const urlParams = new URLSearchParams(window.location.search);
    // const urlToken = urlParams.get("token");
    // if (urlToken) {
    //   useConfigStore.setState({ token: urlToken });
    // }

    // // Use the token from the store or from the URL parameters
    // const finalToken = urlToken || token;
    // if (finalToken) {
    //   config.headers.Authorization = finalToken;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // if (
    //   location.pathname === "/" ||
    //   location.pathname.includes("expired") ||
    //   location.pathname.includes("error")
    // ) {
    //   window.location.href = useConfigStore.getState().lastVisitPage;
    // } else {
    //   // make sure token is removed from url
    //   const urlParams = new URLSearchParams(location.search);
    //   const urlToken = urlParams.get("token");
    //   if (urlToken) {
    //     urlParams.delete("token");
    //     const newUrl = location.pathname;
    //     history.replaceState(null, "", newUrl);
    //   }
    // }

    return response;
  },
  (error) => {
    // const code = parseInt(error.response && error.response.status);

    // switch (code) {
    //   case 400:
    //   case 401:
    //     window.location.href = "/expired";
    //     break;

    //   case 500:
    //     // window.location.href = "/error";
    //     break;

    //   default:
    //     // window.location.href = "/error";
    //     break;
    // }
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
