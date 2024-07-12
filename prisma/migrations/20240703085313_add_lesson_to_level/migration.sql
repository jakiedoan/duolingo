/*
  Warnings:

  - You are about to drop the column `unit_id` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `level_id` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_unit_id_fkey";

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "unit_id",
ADD COLUMN     "level_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
