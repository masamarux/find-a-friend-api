/*
  Warnings:

  - You are about to drop the column `is_admin` on the `orgs` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "is_admin",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER';
