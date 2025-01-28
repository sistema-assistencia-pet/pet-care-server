/*
  Warnings:

  - You are about to drop the column `endereco` on the `endereço` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `endereço` DROP COLUMN `endereco`,
    ADD COLUMN `rua` VARCHAR(191) NULL;
