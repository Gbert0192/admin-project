const isServer = typeof window === "undefined";
import { auth, signOut } from "@/auth";
import axios, { isAxiosError } from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const nextApiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: nextApiUrl,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    let session;

    try {
      if (isServer) {
        session = await auth();
      } else {
        session = await getSession();
      }

      if (session && config.headers) {
        config.headers.Authorization = `Bearer ${session.user.token}`;
      }
    } catch (e) {
      toast.error(
        `Failed to get session for axios interceptor: ${e instanceof Error ? e.message : String(e)}`
      );
    }

    return config;
  },
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    } else {
      return Promise.reject(new Error(String(error)));
    }
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        redirect("/unauthorized");
      } else if (error.response?.status === 498) {
        toast.error("Session expired. Redirecting...");
        await signOut();
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        } else {
          redirect("/sign-in");
        }
      } else if (error.response?.status === 403) {
        redirect("/error?code=403");
      } else if (error.response?.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        let message = "Too Many Requests. ";
        if (retryAfter) {
          message += ` Coba lagi dalam ${retryAfter} detik.`;
        }
        toast.warning(message);
      }
    } else {
      toast.error("Terjadi kesalahan tak terduga");
    }

    return Promise.reject(
      error instanceof Error ? error : new Error(String(error))
    );
  }
);

export default api;
