/*
  Warnings:

  - You are about to drop the column `saldo_disponivel` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `saldo_reservado` on the `configuracao_de_voucher_por_cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `saldo_disponivel`,
    ADD COLUMN `saldo_disponivel_em_centavos` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `configuracao_de_voucher_por_cliente` DROP COLUMN `saldo_reservado`,
    ADD COLUMN `saldo_reservado_em_centavos` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `recarga_cliente` MODIFY `valor` INTEGER NOT NULL;
