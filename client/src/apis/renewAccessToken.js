import axios from "axios";
import { getCookie } from "../utils/cookie";

export const renewAccessToken = async () => {
  const headers = {
    Authorization: "Bearer " + getCookie("access"),
  };
  const result = await axios.post(
    "/member/reissue",
    { headers },
    {
      email: getCookie("email"),
      accessToken: getCookie("access"),
      refreshToken: getCookie("refresh"),
    }
  );
  return result;
};
