/*
  Warnings:

  - You are about to drop the column `valor` on the `recarga_cliente` table. All the data in the column will be lost.
  - Added the required column `valor_em_centavos` to the `recarga_cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recarga_cliente` DROP COLUMN `valor`,
    ADD COLUMN `valor_em_centavos` INTEGER NOT NULL;
