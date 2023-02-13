/*
  Warnings:

  - You are about to drop the `_ChannelToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ChannelToUser` DROP FOREIGN KEY `_ChannelToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ChannelToUser` DROP FOREIGN KEY `_ChannelToUser_B_fkey`;

-- DropTable
DROP TABLE `_ChannelToUser`;

-- CreateTable
CREATE TABLE `UserChannels` (
    `user_id` INTEGER NOT NULL,
    `channel_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `channel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserChannels` ADD CONSTRAINT `UserChannels_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChannels` ADD CONSTRAINT `UserChannels_channel_id_fkey` FOREIGN KEY (`channel_id`) REFERENCES `Channel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
