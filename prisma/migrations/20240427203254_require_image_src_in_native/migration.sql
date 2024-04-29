/*
  Warnings:

  - Made the column `image_src` on table `Native_Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Native_Language" ALTER COLUMN "image_src" SET NOT NULL;
