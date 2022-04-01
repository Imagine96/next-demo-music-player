/*
  Warnings:

  - Added the required column `color` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "img" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "favorites" INTEGER[];
