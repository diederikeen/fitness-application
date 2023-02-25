-- CreateTable
CREATE TABLE "Weight" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Weight_id_key" ON "Weight"("id");

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
