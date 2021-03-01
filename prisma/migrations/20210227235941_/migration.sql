/*
  Warnings:

  - You are about to drop the column `interval` on the `KlineData` table. All the data in the column will be lost.
  - Added the required column `timeframe` to the `KlineData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KlineData" DROP COLUMN "interval",
ADD COLUMN     "timeframe" VARCHAR(10) NOT NULL;
