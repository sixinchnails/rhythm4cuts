import axios from "axios";

export const login = async (email, password) => {
  // const result = await axios.post("http://localhost:8080/member/login", {
  const result = await axios.post("member/login", {
    email,
    password,
  });
  return result;
};
