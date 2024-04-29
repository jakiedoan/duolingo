-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "native_language_id" TEXT;

-- CreateTable
CREATE TABLE "NativeLanguage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "NativeLanguage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_native_language_id_fkey" FOREIGN KEY ("native_language_id") REFERENCES "NativeLanguage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
