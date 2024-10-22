/*
  Warnings:

  - Added the required column `cliente_ligero_id` to the `cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "cliente_ligero_id" INTEGER NOT NULL;
