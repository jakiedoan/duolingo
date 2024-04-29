/*
  Warnings:

  - You are about to drop the column `native_language_id` on the `Courses` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_user_id_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "native_language_id",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "_CoursesToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToUser_AB_unique" ON "_CoursesToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToUser_B_index" ON "_CoursesToUser"("B");

-- AddForeignKey
ALTER TABLE "_CoursesToUser" ADD CONSTRAINT "_CoursesToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToUser" ADD CONSTRAINT "_CoursesToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
