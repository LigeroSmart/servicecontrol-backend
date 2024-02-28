/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `tipo_contrato` will be added. If there are existing duplicate values, this will fail.
  - Made the column `descricao` on table `tipo_contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tipo_contrato" ALTER COLUMN "descricao" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "uk_tipo_contrato_descricao" ON "tipo_contrato"("descricao");
