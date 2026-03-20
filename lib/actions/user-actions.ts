"use server";

import { prisma } from "../prisma";
import { addPlayerProfileSchema, AddPlayerProfileSchema, UpdateProfileSchema } from "../zod";
import { resError, resSuccess } from "../response";
import { getUserSession } from "../helpers";
import { deleteFromS3, getImageUrl } from "../s3-helpers";

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

    if (user.image) {
      user.image = await getImageUrl(user.image);
    }

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
    // TODO: Add Image upload in create Profile too
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

export const updateProfile = async (data: UpdateProfileSchema) => {
  try {
    const session = await getUserSession();

    if (!session) {
      return resError("Unauthorized");
    }
    const userId = session.user.id;
    const { name, image, rating, position } = data;

    const exsitingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });

    let oldImageKey: string | null = null;

    if (image && exsitingUser?.image) {
      oldImageKey = exsitingUser.image;
    }

    await prisma.$transaction(async (tx) => {
      if (name || image) {
        await tx.user.update({
          where: { id: userId },
          data: {
            ...(name && { name }),
            ...(image && { image })
          }
        });
      }

      if (rating !== undefined || position) {
        await tx.playerProfile.update({
          where: { userId },
          data: {
            ...(rating !== undefined && { rating }),
            ...(position && { position })
          }
        });
      }
    });

    if (oldImageKey) {
      await deleteFromS3(oldImageKey);
    }

    return resSuccess("Profile updated Successfully");
  } catch (error) {
    console.log(error);
    return resError("Failed to update profile");
  }
};
