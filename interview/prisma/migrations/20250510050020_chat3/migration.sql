/*
  Warnings:

  - You are about to drop the column `date` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `human` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `system` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `chat` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "date",
DROP COLUMN "human",
DROP COLUMN "system",
ADD COLUMN     "chat" TEXT NOT NULL;
