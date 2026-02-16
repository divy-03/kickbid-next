"use server";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";

export const getMyProfile = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    const profile = await prisma.playerProfile.findUnique({
      where: {
        userId: session.user.id
      }
    })
    return profile;
  } catch {
    return null;
  }
}
