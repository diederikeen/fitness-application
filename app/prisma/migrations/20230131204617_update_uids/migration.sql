/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Weight" DROP CONSTRAINT "Weight_uid_fkey";

-- AlterTable
ALTER TABLE "Weight" ALTER COLUMN "uid" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
