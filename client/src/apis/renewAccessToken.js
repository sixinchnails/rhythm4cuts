import axios from "axios";
import { getCookie } from "../utils/cookie";

export const renewAccessToken = async () => {
  const headers = {
    Authorization: "Bearer " + getCookie("access"),
  };
  const result = await axios.post(
    "https://i9b109.p.ssafy.io:8443/member/reissue",
    { headers },
    {
      email: getCookie("email"),
      accessToken: getCookie("access"),
      refreshToken: getCookie("refresh"),
    }
  );
  return result;
};
