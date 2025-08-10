/*
  Warnings:

  - Made the column `attempts` on table `sendEmail` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sendEmail" ALTER COLUMN "attempts" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profilePicture" VARCHAR(255);
