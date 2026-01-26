import axios from "axios";
import { navigate } from "../lib/navigation";
import queryClient from "./query.client";
import { UNAUTHORIZED } from "@/constants/http";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// create a separate client for refreshing the access token
// to avoid infinite loops with the error interceptor
const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    console.log("this is the response", response);
    console.log("this is the config", config);
    const { status, data } = response || {};

    console.log("this is the status", status);
    console.log("this is data", data);
    console.log("this is the data error code", data.errorCode);

    // try to refresh the access token behind the scenes
    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {
        // refresh the access token, then retry the original request
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (error) {
        // handle refresh errors by clearing the query cache & redirecting to login
        queryClient.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject({ status, ...data });
  },
);

export default API;
