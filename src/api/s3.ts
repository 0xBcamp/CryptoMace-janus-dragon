import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
  },
});

export const main = async () => {
  const command = new GetObjectCommand({
    Bucket: `r8rbucket`,
    Key: "1.png",
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body?.transformToString();
    console.log(str);
  } catch (err) {
    console.error(err);
  }
};
main();
