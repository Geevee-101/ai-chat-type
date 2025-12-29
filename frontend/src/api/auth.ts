import axios from "../lib/axios";

export const signupUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const res = await axios.post("/auth/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Signup failed");
  }
  const data = res.data;
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/auth/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Login failed");
  }
  const data = res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/auth/logout");
  if (res.status !== 200) {
    throw new Error("Logout failed");
  }
  const data = res.data;
  return data;
};

export const verifyAuthStatus = async () => {
  const res = await axios.get("/auth/verify");
  if (res.status !== 200) {
    throw new Error("Authentication failed");
  }
  const data = res.data;
  return data;
};
