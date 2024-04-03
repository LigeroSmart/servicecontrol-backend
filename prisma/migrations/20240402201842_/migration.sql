/*
  Warnings:

  - Made the column `tipo_chamado_id` on table `regra_cobranca_tipo_chamado` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "regra_cobranca_tipo_chamado" ALTER COLUMN "tipo_chamado_id" SET NOT NULL;
