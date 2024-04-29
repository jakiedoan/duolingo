/*
  Warnings:

  - The `native_language_id` column on the `Courses` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_native_language_id_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "native_language_id",
ADD COLUMN     "native_language_id" TEXT[];

-- CreateTable
CREATE TABLE "_CoursesToNative_Language" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToNative_Language_AB_unique" ON "_CoursesToNative_Language"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToNative_Language_B_index" ON "_CoursesToNative_Language"("B");

-- AddForeignKey
ALTER TABLE "_CoursesToNative_Language" ADD CONSTRAINT "_CoursesToNative_Language_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToNative_Language" ADD CONSTRAINT "_CoursesToNative_Language_B_fkey" FOREIGN KEY ("B") REFERENCES "Native_Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
