-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `id_cargo` INTEGER NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `usuario_email_key`(`email`),
    INDEX `usuario_nome_idx`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `codigo_redefinicao_de_senha_de_usuario` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `codigo_de_redefinicao` VARCHAR(191) NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cargo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `traducao` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cargo_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `traducao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `estado_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `id_estado` INTEGER NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereço` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `numero` VARCHAR(191) NULL,
    `complemento` VARCHAR(191) NULL,
    `bairro` VARCHAR(191) NULL,
    `id_cidade` INTEGER NULL,
    `id_estado` INTEGER NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `razao_social` VARCHAR(191) NULL,
    `nome_fantasia` VARCHAR(191) NULL,
    `segmento` VARCHAR(191) NULL,
    `id_endereco` INTEGER NULL,
    `id_estado` INTEGER NULL,
    `id_cidade` INTEGER NULL,
    `nome_do_responsavel` VARCHAR(191) NULL,
    `telefone_do_responsavel` VARCHAR(191) NULL,
    `email_do_responsavel` VARCHAR(191) NULL,
    `telefone_do_financeiro` VARCHAR(191) NULL,
    `valor_do_boleto` DOUBLE NULL,
    `valor_unitario` DOUBLE NULL,
    `url_do_contrato` VARCHAR(191) NULL,
    `saldo_disponivel` DOUBLE NULL DEFAULT 0,
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `cliente_cnpj_key`(`cnpj`),
    INDEX `cliente_nome_fantasia_idx`(`nome_fantasia`),
    INDEX `cliente_segmento_idx`(`segmento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recarga_cliente` (
    `id` VARCHAR(191) NOT NULL,
    `id_cliente` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estabelecimento` (
    `id` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(191) NOT NULL,
    `razao_social` VARCHAR(191) NULL,
    `nome_fantasia` VARCHAR(191) NULL,
    `id_endereco` INTEGER NULL,
    `id_estado` INTEGER NULL,
    `id_cidade` INTEGER NULL,
    `id_categoria` INTEGER NOT NULL,
    `tags` VARCHAR(191) NULL,
    `online` BOOLEAN NOT NULL,
    `nome_do_responsavel` VARCHAR(191) NULL,
    `telefone_do_responsavel` VARCHAR(191) NULL,
    `email_do_responsavel` VARCHAR(191) NULL,
    `telefone_do_comercial` VARCHAR(191) NULL,
    `sobre` VARCHAR(191) NULL,
    `horario_de_funcionamento` VARCHAR(191) NULL,
    `imagem` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `estabelecimento_cnpj_key`(`cnpj`),
    INDEX `estabelecimento_nome_fantasia_idx`(`nome_fantasia`),
    INDEX `estabelecimento_online_idx`(`online`),
    INDEX `estabelecimento_tags_idx`(`tags`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `associado` (
    `id` VARCHAR(191) NOT NULL,
    `id_cliente` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `telefone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `data_de_nascimento` VARCHAR(191) NULL,
    `id_endereco` INTEGER NULL,
    `senha` VARCHAR(191) NULL,
    `criou_senha` BOOLEAN NOT NULL DEFAULT false,
    `id_cargo` INTEGER NOT NULL,
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `associado_cpf_key`(`cpf`),
    INDEX `associado_nome_idx`(`nome`),
    INDEX `associado_id_cliente_idx`(`id_cliente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `codigo_redefinicao_de_senha_de_associado` (
    `id_associado` VARCHAR(191) NOT NULL,
    `codigo_de_redefinicao` VARCHAR(191) NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_associado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voucher` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NULL,
    `descricao` VARCHAR(191) NULL,
    `regras` VARCHAR(191) NULL,
    `valor` DOUBLE NOT NULL DEFAULT 0,
    `id_parceiro` VARCHAR(191) NOT NULL,
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `codigo_de_voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `id_voucher` VARCHAR(191) NOT NULL,
    `foi_resgatado` BOOLEAN NOT NULL DEFAULT false,
    `id_status` INTEGER NOT NULL DEFAULT 1,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resgate_de_voucher` (
    `id` VARCHAR(191) NOT NULL,
    `id_associado` VARCHAR(191) NOT NULL,
    `id_cliente` VARCHAR(191) NOT NULL,
    `id_codigo_de_voucher` INTEGER NOT NULL,
    `id_voucher` VARCHAR(191) NOT NULL,
    `id_parceiro` VARCHAR(191) NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `resgate_de_voucher_id_codigo_de_voucher_key`(`id_codigo_de_voucher`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fila_de_espera_de_voucher_por_cliente` (
    `id_associado` VARCHAR(191) NOT NULL,
    `id_voucher` VARCHAR(191) NOT NULL,
    `aguardando_ate` DATETIME(3) NOT NULL,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_associado`, `id_voucher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `configuracao_de_voucher_por_cliente` (
    `id_cliente` VARCHAR(191) NOT NULL,
    `id_voucher` VARCHAR(191) NOT NULL,
    `saldo_reservado` DOUBLE NOT NULL DEFAULT 0,
    `tempo_de_espera_em_dias` INTEGER NOT NULL DEFAULT 0,
    `data_de_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_de_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_cliente`, `id_voucher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_cargo_fkey` FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigo_redefinicao_de_senha_de_usuario` ADD CONSTRAINT `codigo_redefinicao_de_senha_de_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cidade` ADD CONSTRAINT `cidade_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereço` ADD CONSTRAINT `endereço_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereço` ADD CONSTRAINT `endereço_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `cidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `endereço`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `cidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recarga_cliente` ADD CONSTRAINT `recarga_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `endereço`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estabelecimento` ADD CONSTRAINT `estabelecimento_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `cidade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `associado` ADD CONSTRAINT `associado_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `associado` ADD CONSTRAINT `associado_id_cargo_fkey` FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `associado` ADD CONSTRAINT `associado_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `associado` ADD CONSTRAINT `associado_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `endereço`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigo_redefinicao_de_senha_de_associado` ADD CONSTRAINT `codigo_redefinicao_de_senha_de_associado_id_associado_fkey` FOREIGN KEY (`id_associado`) REFERENCES `associado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voucher` ADD CONSTRAINT `voucher_id_parceiro_fkey` FOREIGN KEY (`id_parceiro`) REFERENCES `estabelecimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigo_de_voucher` ADD CONSTRAINT `codigo_de_voucher_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigo_de_voucher` ADD CONSTRAINT `codigo_de_voucher_id_voucher_fkey` FOREIGN KEY (`id_voucher`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resgate_de_voucher` ADD CONSTRAINT `resgate_de_voucher_id_associado_fkey` FOREIGN KEY (`id_associado`) REFERENCES `associado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resgate_de_voucher` ADD CONSTRAINT `resgate_de_voucher_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resgate_de_voucher` ADD CONSTRAINT `resgate_de_voucher_id_codigo_de_voucher_fkey` FOREIGN KEY (`id_codigo_de_voucher`) REFERENCES `codigo_de_voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resgate_de_voucher` ADD CONSTRAINT `resgate_de_voucher_id_voucher_fkey` FOREIGN KEY (`id_voucher`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resgate_de_voucher` ADD CONSTRAINT `resgate_de_voucher_id_parceiro_fkey` FOREIGN KEY (`id_parceiro`) REFERENCES `estabelecimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fila_de_espera_de_voucher_por_cliente` ADD CONSTRAINT `fila_de_espera_de_voucher_por_cliente_id_associado_fkey` FOREIGN KEY (`id_associado`) REFERENCES `associado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fila_de_espera_de_voucher_por_cliente` ADD CONSTRAINT `fila_de_espera_de_voucher_por_cliente_id_voucher_fkey` FOREIGN KEY (`id_voucher`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuracao_de_voucher_por_cliente` ADD CONSTRAINT `configuracao_de_voucher_por_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `configuracao_de_voucher_por_cliente` ADD CONSTRAINT `configuracao_de_voucher_por_cliente_id_voucher_fkey` FOREIGN KEY (`id_voucher`) REFERENCES `voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
