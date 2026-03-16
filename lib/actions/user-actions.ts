"use server";

import { prisma } from "../prisma";
import { addPlayerProfileSchema, AddPlayerProfileSchema } from "../zod";
import { resError, resSuccess } from "../reponse";
import { getUserSession } from "../helpers";

export const getMyProfile = async () => {
  try {
    const session = await getUserSession();
    if (!session) return resError("Unauthorized");

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      },
      include: {
        playerProfile: true,
      }
    })
    if (!user) return resError("User not found");
    return resSuccess(user);
  } catch (error) {
    console.log(error);
    return resError("Something went wrong while fetching profile");
  }
}

export const createProfile = async (data: AddPlayerProfileSchema) => {
  try {
    const parsed = addPlayerProfileSchema.parse(data); // NOTE: Should I use parse() or safeParse()
    const session = await getUserSession();
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
        rating: parsed.rating,
        position: parsed.position,
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
