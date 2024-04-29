/*
  Warnings:

  - Made the column `code` on table `Courses` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `Native_Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "code" SET NOT NULL;

-- AlterTable
ALTER TABLE "Native_Language" ADD COLUMN     "image_src" TEXT,
ALTER COLUMN "code" SET NOT NULL;
