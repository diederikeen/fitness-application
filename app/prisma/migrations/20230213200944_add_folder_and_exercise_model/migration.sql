-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "folder_id" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_id_key" ON "Folder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
