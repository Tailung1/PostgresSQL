-- CreateTable
CREATE TABLE "userProducts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "userProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userProducts" ADD CONSTRAINT "userProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userProducts" ADD CONSTRAINT "userProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
