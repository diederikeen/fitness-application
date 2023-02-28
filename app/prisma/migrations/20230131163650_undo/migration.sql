/*
  Warnings:

  - You are about to drop the `WeightModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_uid_fkey";

-- DropIndex
DROP INDEX "User_uid_key";

-- DropTable
DROP TABLE "WeightModel";
