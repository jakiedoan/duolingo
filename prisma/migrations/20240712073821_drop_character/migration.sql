/*
  Warnings:

  - You are about to drop the column `character_id` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_character_id_fkey";

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "character_id";

-- DropTable
DROP TABLE "Character";
