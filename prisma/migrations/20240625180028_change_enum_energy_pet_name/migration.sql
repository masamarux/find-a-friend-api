/*
  Warnings:

  - The values [UNSTOPABLE] on the enum `ENERGY` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ENERGY_new" AS ENUM ('QUIET', 'LOW', 'MEDIUM', 'HIGH', 'UNSTOPPABLE');
ALTER TABLE "pets" ALTER COLUMN "energy" DROP DEFAULT;
ALTER TABLE "pets" ALTER COLUMN "energy" TYPE "ENERGY_new" USING ("energy"::text::"ENERGY_new");
ALTER TYPE "ENERGY" RENAME TO "ENERGY_old";
ALTER TYPE "ENERGY_new" RENAME TO "ENERGY";
DROP TYPE "ENERGY_old";
ALTER TABLE "pets" ALTER COLUMN "energy" SET DEFAULT 'MEDIUM';
COMMIT;
