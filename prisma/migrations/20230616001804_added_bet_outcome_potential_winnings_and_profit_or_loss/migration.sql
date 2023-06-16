/*
  Warnings:

  - Added the required column `betOutcome` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BetOutcome" AS ENUM ('win', 'loss');

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "betOutcome" "BetOutcome" NOT NULL,
ADD COLUMN     "potentialWinnings" DOUBLE PRECISION,
ADD COLUMN     "profitOrLoss" DOUBLE PRECISION;
