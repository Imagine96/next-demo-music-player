/*
  Warnings:

  - Added the required column `description` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL;
