/*
  Warnings:

  - Added the required column `atividade_ligero_id` to the `atividade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividade" ADD COLUMN     "atividade_ligero_id" INTEGER NOT NULL;
