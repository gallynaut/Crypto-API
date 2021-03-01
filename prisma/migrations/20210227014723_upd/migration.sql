/*
  Warnings:

  - Added the required column `interval` to the `KlineData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "KlineData" ADD COLUMN     "interval" VARCHAR(10) NOT NULL;
