import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createQueryParams(
  obj: Record<string, string | number | boolean | undefined | null>
): string {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

export interface SearchParams {
  searchParams: Promise<Record<string, string | undefined>>;
}

export interface Permission {
  route: string;
  method: string[];
}

export function checkPermission(
  userPermissions: Permission[],
  route: string,
  method: "PUT" | "POST" | "DELETE" | "GET"
): boolean {
  return userPermissions.some((p) => {
    return p.route === route && p.method.includes(method);
  });
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[_-\s]+/g, " ") // ganti _, -, dan spasi jadi spasi
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
