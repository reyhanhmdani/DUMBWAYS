-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
