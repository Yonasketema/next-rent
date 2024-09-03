/*
  Warnings:

  - Added the required column `name` to the `Permissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permissions" ADD COLUMN     "name" TEXT NOT NULL;
