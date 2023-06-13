/*
  Warnings:

  - Added the required column `betStatus` to the `Bet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oddsTaken` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('in_progress', 'completed');

-- AlterTable
ALTER TABLE "Bet" ADD COLUMN     "betStatus" "BetStatus" NOT NULL,
ADD COLUMN     "oddsTaken" DOUBLE PRECISION NOT NULL;
