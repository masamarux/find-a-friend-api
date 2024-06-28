/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `adoptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "adoptions" DROP COLUMN "deleted_at",
ADD COLUMN     "finished_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
