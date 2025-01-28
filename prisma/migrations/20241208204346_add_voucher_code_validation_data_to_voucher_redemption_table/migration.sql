-- AlterTable
ALTER TABLE `resgate_de_voucher` ADD COLUMN `data_da_validacao` DATETIME(3) NULL,
    ADD COLUMN `foi_validado` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `id_usuario_do_parceiro_que_validou` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `resgate_de_voucher` ADD CONSTRAINT `resgate_de_voucher_id_usuario_do_parceiro_que_validou_fkey` FOREIGN KEY (`id_usuario_do_parceiro_que_validou`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
