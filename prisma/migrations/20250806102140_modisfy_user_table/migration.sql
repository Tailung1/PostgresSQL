/*
  Warnings:

  - The `otpExpiry` column on the `sendEmail` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `otpCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `otpExpiry` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sendEmail" DROP COLUMN "otpExpiry",
ADD COLUMN     "otpExpiry" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "otpCode",
DROP COLUMN "otpExpiry";
