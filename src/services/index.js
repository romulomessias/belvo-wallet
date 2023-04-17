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

export const getWallet = async () => {
  return axiosInstance
    .get("/wallet", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
};

export const getContacts = async () => {
  return axiosInstance
    .get("/contacts", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
};

