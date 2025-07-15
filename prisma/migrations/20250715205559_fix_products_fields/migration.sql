/*
  Warnings:

  - You are about to drop the column `description` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "description",
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "stock" INTEGER;
