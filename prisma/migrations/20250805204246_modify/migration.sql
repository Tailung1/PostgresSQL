/*
  Warnings:

  - You are about to drop the column `otpExpire` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "otpExpire",
ADD COLUMN     "otpExpiry" TIMESTAMP(6);
