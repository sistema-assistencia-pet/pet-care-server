/*
  Warnings:

  - Made the column `nome_do_responsavel` on table `cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email_do_responsavel` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `nome_do_responsavel` VARCHAR(191) NOT NULL,
    MODIFY `email_do_responsavel` VARCHAR(191) NOT NULL;
