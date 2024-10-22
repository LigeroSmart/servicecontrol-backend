/*
  Warnings:

  - Added the required column `contato_ligero_id` to the `contato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contato" ADD COLUMN     "contato_ligero_id" INTEGER NOT NULL;
