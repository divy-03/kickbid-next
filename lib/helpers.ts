import { auth } from "@/utils/auth";
import { headers } from "next/headers";


export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return null;
  }

  return session;
};

export const getKeyFromUrl = (url: string) => {
  return url.split(".amazonaws.com/")[1];
};

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export const safeAction = async <T>(
  fn: () => Promise<T>
): Promise<ActionResult<T>> => {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something went wrong" };
  }
};
