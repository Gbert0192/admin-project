import { auth } from "@/auth";
import axios, { AxiosError, isAxiosError } from "axios";
import { redirect } from "next/navigation";

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
    return Promise.reject(new Error(String(error)));
  }
);
serverApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 429) {
        redirect(`/admin/error?code=429`);
      }
    }
    return Promise.reject(error);
  }
);

export default serverApi;
