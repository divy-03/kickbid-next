"use server";

import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { prisma } from "../prisma";
import { AddPlayerProfileSchema } from "../zod";
import { resError, resSuccess } from "../reponse";

export const getMyProfile = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return resError("Unauthorized");

    const playerProfile = await prisma.playerProfile.findUnique({
      where: {
        userId: session.user.id
      }
    })
    const profile = {
      user: session.user,
      playerProfile
    }
    return resSuccess(profile);
  } catch (error) {
    console.log(error);
    return resError("Something went wrong while fetching profile");
  }
}

export const createProfile = async (data: AddPlayerProfileSchema) => {
  try {
    const position = data.position as string;
    const rating = data.rating as number;
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return resError("Unauthorized");
    }
    const profile = await prisma.playerProfile.findUnique({
      where: {
        userId: session?.user.id
      }
    })
    if (profile) {
      return resError("Profile already exists");
    }
    const newProfile = await prisma.playerProfile.create({
      data: {
        rating,
        position,
        user: {
          connect: {
            id: session!.user.id
          }
        }
      }
    });
    return resSuccess(newProfile);
  } catch (error) {
    console.log(error);
    return resError("Something went wrong while creating profile")
  }
}
