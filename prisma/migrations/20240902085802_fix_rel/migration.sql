/*
  Warnings:

  - You are about to drop the column `permissionsId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_permissionsId_fkey";

-- AlterTable
ALTER TABLE "Permissions" ADD COLUMN     "roleId" INTEGER;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "permissionsId";

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
