import axios from "axios";
import { SignUpBody } from "../pages/sign-up";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_ENDPOINT,
  headers: {
    Accept: "*",
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
  profilePhoto,
}: SignUpBody) {
  const data = await api.post("/auth/local/register", {
    email,
    username,
    displayName,
    password,
    country,
    profilePhoto,
  });
  return data;
}

export async function getMe() {
  const data = await api.get("/users/me?populate=*");
  return data;
}

export async function upload(file?: File | string) {
  if (file) {
    const formData = new FormData();
    formData.append("files", file);
    const data = await api.post("/upload", formData);
    return data;
  } else {
    return;
  }
}

export default api;
