/*
  Warnings:

  - Made the column `order` on table `Section` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "order" SET NOT NULL;
