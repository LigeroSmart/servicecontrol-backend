/*
  Warnings:

  - Added the required column `servico_ligero_id` to the `servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servico" ADD COLUMN     "servico_ligero_id" INTEGER NOT NULL;
