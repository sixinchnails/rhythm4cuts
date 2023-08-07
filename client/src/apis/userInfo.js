import axios from "axios";
import { getCookie } from "../utils/cookie";

export const userInfo = async () => {
   console.log("안녕")
  const params = {
    email: getCookie("email"),
  };
  const headers = {
    Authorization: "Bearer " + getCookie("access"),
  };
  const result = await axios.get("/member/info", {
    params,
    headers,
  });
  console.log(result)
  console.log(result.status);
  return result;
};
