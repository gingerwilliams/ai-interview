/*
  Warnings:

  - You are about to drop the column `chat` on the `Chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "chat",
ADD COLUMN     "human" TEXT[],
ADD COLUMN     "system" TEXT[];
