/*
  Warnings:

  - You are about to drop the column `tempo_de_espera_em_dias` on the `configuracao_de_voucher_por_cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `configuracao_de_voucher_por_cliente` DROP COLUMN `tempo_de_espera_em_dias`,
    ADD COLUMN `tempo_de_espera_em_horas` INTEGER NOT NULL DEFAULT 0;
