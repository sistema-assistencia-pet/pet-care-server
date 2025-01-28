-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `id_cliente` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
