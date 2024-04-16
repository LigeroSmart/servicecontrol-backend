/*
  Warnings:

  - Made the column `regra_franquia_id` on table `regra_franquia_servico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "regra_franquia_servico" ALTER COLUMN "regra_franquia_id" SET NOT NULL;
