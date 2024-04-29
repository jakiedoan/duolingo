/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Courses_id_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "Courses_code_key" ON "Courses"("code");
