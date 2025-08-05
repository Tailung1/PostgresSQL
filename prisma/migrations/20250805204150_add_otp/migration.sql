-- AlterTable
ALTER TABLE "users" ADD COLUMN     "otpCode" VARCHAR(6),
ADD COLUMN     "otpExpire" TIMESTAMP(6);
