-- AlterTable
ALTER TABLE `estabelecimento` ADD COLUMN `id_cargo` INTEGER NOT NULL DEFAULT 4;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_id_cargo_fkey` FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
