/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Native_Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Native_Language_code_key" ON "Native_Language"("code");
