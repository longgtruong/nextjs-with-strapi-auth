import axios from "axios";
import { SignUpBody } from "../pages/sign-up";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function authenticate({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) {
  const data = await api.post("/auth/local", {
    identifier,
    password,
  });
  return data;
}

export async function createAccount({
  email,
  username,
  displayName,
  password,
  country,
}: SignUpBody) {
  const data = await api.post("/auth/local/register", {
    email,
    username,
    displayName,
    password,
    country,
  });
  return data;
}

export async function getMe() {
  const data = await api.get("/users/me");
  return data;
}

export default api;
