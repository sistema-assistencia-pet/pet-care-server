/*
  Warnings:

  - You are about to drop the `recarga_cliente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `recarga_cliente` DROP FOREIGN KEY `recarga_cliente_id_cliente_fkey`;

-- DropTable
DROP TABLE `recarga_cliente`;

-- CreateTable
CREATE TABLE `transacoes_de_saldo_do_cliente` (
    `id` VARCHAR(191) NOT NULL,
    `id_cliente` VARCHAR(191) NOT NULL,
    `valor_em_centavos` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transacoes_de_saldo_do_cliente` ADD CONSTRAINT `transacoes_de_saldo_do_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
