/*
  Warnings:

  - Made the column `order` on table `Unit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "order" SET NOT NULL;
