-- CreateTable
CREATE TABLE `contact_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hobbies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `family` VARCHAR(255) NOT NULL,
    `sex` VARCHAR(10) NULL,
    `age` INTEGER NULL,
    `pic` VARCHAR(512) NULL,
    `bio` TEXT NULL,
    `contact_info_id` INTEGER NULL,
    `skills_id` INTEGER NULL,
    `links_id` INTEGER NULL,
    `hobbies_id` INTEGER NULL,

    INDEX `contact_info_id`(`contact_info_id`),
    INDEX `hobbies_id`(`hobbies_id`),
    INDEX `links_id`(`links_id`),
    INDEX `skills_id`(`skills_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `links` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NULL,
    `about` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `start_at` DATE NULL,
    `level` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_ibfk_1` FOREIGN KEY (`contact_info_id`) REFERENCES `contact_info`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_ibfk_2` FOREIGN KEY (`skills_id`) REFERENCES `skills`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_ibfk_3` FOREIGN KEY (`links_id`) REFERENCES `links`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `info` ADD CONSTRAINT `info_ibfk_4` FOREIGN KEY (`hobbies_id`) REFERENCES `hobbies`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
