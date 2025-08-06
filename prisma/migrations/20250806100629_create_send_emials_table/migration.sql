-- CreateTable
CREATE TABLE "sendEmail" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "otpCode" VARCHAR(255),
    "otpExpiry" VARCHAR(255),

    CONSTRAINT "sendEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sendEmail" ADD CONSTRAINT "sendEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
