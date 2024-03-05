/*
  Warnings:

  - You are about to drop the column `family` on the `info` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `info` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `info` DROP COLUMN `family`,
    DROP COLUMN `name`,
    ADD COLUMN `first_name` VARCHAR(255) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `table_name` VARCHAR(255) NULL,
    `action_type` VARCHAR(20) NULL,
    `record_id` INTEGER NULL,
    `log_timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
