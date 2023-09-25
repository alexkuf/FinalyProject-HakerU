import axios from "axios";
import config from "../cofig.json";
import { toast } from "react-toastify";

axios.defaults.baseURL = config.apiUrl;

export function setCommonHeader(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}

axios.interceptors.response.use(null, (error) => {
  if (error.code === "ERR_NETWORK") {
    toast.error("Network error");
  } else if (error.response.status >= 403) {
    toast.error("An unexpected error occurred");
  }
  return Promise.reject(error);
});

const httpService = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete,
  setCommonHeader,
};

export default httpService;
