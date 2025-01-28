/*
  Warnings:

  - You are about to drop the column `valor_do_boleto` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `valor_unitario` on the `cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `valor_do_boleto`,
    DROP COLUMN `valor_unitario`,
    ADD COLUMN `valor_do_boleto_em_centavos` DOUBLE NULL,
    ADD COLUMN `valor_unitario_em_centavos` DOUBLE NULL;
