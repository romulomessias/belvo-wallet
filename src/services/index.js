import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

export const login = async (loginData) => {
  return axiosInstance.post("/login", loginData, {}).then(({ data }) => {
    const decodedAccessToken = jwtDecode(data.access_token);

    Cookies.set("accessToken", data.access_token, {
      expires: new Date(decodedAccessToken.exp * 1000),
      secure: true,
    });
  });
};
