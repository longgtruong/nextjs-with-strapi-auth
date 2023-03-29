import axios from "axios";

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

export default api;
