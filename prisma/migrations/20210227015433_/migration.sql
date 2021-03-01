/*
  Warnings:

  - You are about to alter the column `openTime` on the `KlineData` table. The data in that column could be lost. The data in that column will be cast from `VarChar(32)` to `VarChar(12)`.
  - You are about to alter the column `closeTime` on the `KlineData` table. The data in that column could be lost. The data in that column will be cast from `VarChar(32)` to `VarChar(12)`.
  - Changed the type of `createdAt` on the `ApiKey` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ApiKey" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" VARCHAR(12) NOT NULL;

-- AlterTable
ALTER TABLE "KlineData" ALTER COLUMN "openTime" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "closeTime" SET DATA TYPE VARCHAR(12);
