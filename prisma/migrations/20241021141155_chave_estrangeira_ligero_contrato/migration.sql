/*
  Warnings:

  - Added the required column `contrato_ligero_id` to the `contrato` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contrato" ADD COLUMN     "contrato_ligero_id" INTEGER NOT NULL;
