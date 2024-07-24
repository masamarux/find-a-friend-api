/*
  Warnings:

  - A unique constraint covering the columns `[pet_id]` on the table `pet_images` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pet_images_pet_id_key" ON "pet_images"("pet_id");
