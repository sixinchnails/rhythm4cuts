import axios from "axios";

export const login = async (email, password) => {
  const result = await axios.post("http://i9b109.p.ssafy.io:8080/member/login", {
    email,
    password,
  });
  return result;
};
