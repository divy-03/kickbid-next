import { auth } from "@/utils/auth";
import { headers } from "next/headers";


export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session;
};
