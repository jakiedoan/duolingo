/*
  Warnings:

  - A unique constraint covering the columns `[id,code]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Courses_id_code_key" ON "Courses"("id", "code");
