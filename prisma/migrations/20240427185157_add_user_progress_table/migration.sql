/*
  Warnings:

  - You are about to drop the column `userId` on the `Courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Courses" DROP CONSTRAINT "Courses_userId_fkey";

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT;

-- CreateTable
CREATE TABLE "Progress" (
    "user_id" TEXT NOT NULL,
    "active_course_id" TEXT NOT NULL,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "gems" INTEGER NOT NULL DEFAULT 500,
    "hearts" INTEGER NOT NULL DEFAULT 5
);

-- CreateIndex
CREATE UNIQUE INDEX "Progress_user_id_key" ON "Progress"("user_id");

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_active_course_id_fkey" FOREIGN KEY ("active_course_id") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
