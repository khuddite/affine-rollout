import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto", // required for Cloudflare
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_WRITE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_WRITE_SECRET_ACCESS_KEY!,
  },
});

export async function listFilesFromR2() {
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_ID!,
    Prefix: "affine/results/",
  });

  const fileListResponse = await r2.send(listCommand);
  const files =
    fileListResponse.Contents?.map((obj) => ({
      name: obj.Key,
      lastModified: obj.LastModified,
    })) || [];

  return files;
}
