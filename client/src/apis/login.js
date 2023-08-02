import axios from "axios";

export const login = async (email, password) => {
  const result = await axios.post("http://i9b109.p.ssafy.io/member/login", {
    email,
    password,
  });
  return result;
};
