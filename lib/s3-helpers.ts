"use server";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";
import { getUserSession } from "@/lib/helpers";

export const getUploadUrl = async (fileType: string) => {
  const session = await getUserSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const key = `profile/${session.user.id}-${Date.now()}`;

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 });

  return {
    uploadUrl: url,
    key,
  };
};

export const deleteFromS3 = async (key: string) => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
    })
  );
};

export const getImageUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: key,
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5,
  });

  return url;
}
