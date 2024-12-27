-- CreateTable
CREATE TABLE `Voucher` (
    `id` VARCHAR(191) NOT NULL,
    `docType` VARCHAR(191) NOT NULL,
    `correlative` VARCHAR(191) NOT NULL,
    `serie` VARCHAR(191) NOT NULL,
    `fechaEmision` DATETIME(3) NOT NULL,
    `tipoDocumentoIdentidad` VARCHAR(191) NOT NULL,
    `numeroDocumentoIdentidad` VARCHAR(191) NOT NULL,
    `nombreLegalReceptor` VARCHAR(191) NOT NULL,
    `moneda` VARCHAR(191) NOT NULL,
    `montoTotal` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
