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
  const result = await axios.get("http://i9b109.p.ssafy.io:8080/member/info", {
    // const result = await axios.get("http://localhost:8080/member/info", {
    params,
    headers,
  });
  return result;
};
