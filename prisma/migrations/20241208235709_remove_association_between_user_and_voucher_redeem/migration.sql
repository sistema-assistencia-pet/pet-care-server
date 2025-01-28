/*
  Warnings:

  - You are about to drop the column `id_usuario_do_parceiro_que_validou` on the `resgate_de_voucher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `resgate_de_voucher` DROP FOREIGN KEY `resgate_de_voucher_id_usuario_do_parceiro_que_validou_fkey`;

-- AlterTable
ALTER TABLE `resgate_de_voucher` DROP COLUMN `id_usuario_do_parceiro_que_validou`;
