/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `codigo_de_voucher` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `codigo_de_voucher_codigo_id_voucher_key` ON `codigo_de_voucher`;

-- CreateIndex
CREATE UNIQUE INDEX `codigo_de_voucher_codigo_key` ON `codigo_de_voucher`(`codigo`);
