-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255),
    "categoryID" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "untitled_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
