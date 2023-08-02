import axios from "axios";
import { getCookie } from "../utils/cookie";

export const userInfo = async () => {
  const params = {
    email: "ssafy1@naver.com",
    // email: getCookie("email"),
  };
  const headers = {
    Authorization: "Bearer " + getCookie("access"),
  };

  const result = await axios.get("/member/info", {
    params,
    headers,
  });
  return result;
};
