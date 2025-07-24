-- CreateTable
CREATE TABLE "Rollout" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hotkey" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "revision" TEXT NOT NULL,
    "block" INTEGER NOT NULL,
    "response" TEXT,
    "error" TEXT,
    "success" BOOLEAN NOT NULL,
    "score" DOUBLE PRECISION,

    CONSTRAINT "Rollout_pkey" PRIMARY KEY ("id")
);
