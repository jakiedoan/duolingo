/*
  Warnings:

  - You are about to drop the `NativeLanguage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_native_language_id_fkey";

-- DropTable
DROP TABLE "NativeLanguage";

-- CreateTable
CREATE TABLE "Native_Language" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Native_Language_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_native_language_id_fkey" FOREIGN KEY ("native_language_id") REFERENCES "Native_Language"("id") ON DELETE SET NULL ON UPDATE CASCADE;
