/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "streetName" DROP NOT NULL,
ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WeightModel" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "WeightModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeightModel_userId_key" ON "WeightModel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_uid_fkey" FOREIGN KEY ("uid") REFERENCES "WeightModel"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
