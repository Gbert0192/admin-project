// lib/api/serverApi.ts
import { auth } from "@/auth";
import axios, { AxiosError } from "axios";

const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

serverApi.interceptors.request.use(
  async (config) => {
    const session = await auth();
    if (session?.user?.token) {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error: unknown) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error("Unknown error occurred"));
  }
);

serverApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default serverApi;
