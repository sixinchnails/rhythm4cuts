import axios from "axios";
import { getCookie } from "../utils/cookie";

export const renewAccesToken = async (email, password) => {
  const refreshToken = getCookie("refresh");
  const result = await axios.post("member/login", {
    email,
    password,
  });
  return result;
};
