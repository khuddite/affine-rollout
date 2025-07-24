import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { PrismaClient } from "@/lib/generated/prisma-client";
import { Readable } from "stream";

const prisma = new PrismaClient();

const r2 = new S3Client({
  region: "auto", // required for Cloudflare
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_WRITE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_WRITE_SECRET_ACCESS_KEY!,
  },
});

async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

export async function syncFromR2ToDB() {
  const listCommand = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_ID!,
    Prefix: "affine/results/",
  });

  const fileListResponse = await r2.send(listCommand);
  const files = fileListResponse.Contents?.map((obj) => obj.Key) || [];

  const rollouts = await Promise.all(
    files.map(async (file) => {
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_ID!,
        Key: file,
      });

      const response = await r2.send(command);
      const bodyContents = await streamToString(response.Body as Readable);

      const rolloutData = JSON.parse(bodyContents);
      console.log(
        `[SYNC] Rollout data from ${file} synced ✅`,
        typeof rolloutData
      );
      return rolloutData;
    })
  );

  await Promise.all(
    rollouts.flat().map(async (rollout) => {
      const parsedRollout = JSON.parse(rollout);
      await prisma.rollout.create({
        data: {
          uid: parsedRollout.miner.uid,
          hotkey: parsedRollout.miner.hotkey,
          model: parsedRollout.miner.model,
          revision: parsedRollout.miner.revision,
          block: parsedRollout.miner.block,
          response: parsedRollout.response.response,
          error: parsedRollout.response.error,
          success: parsedRollout.response.success,
          score: parsedRollout.evaluation.score,
        },
      });
    })
  );
}
