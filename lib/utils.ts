import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session;
};
