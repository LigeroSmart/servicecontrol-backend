/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `tipo_atividade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "uk_tipo_atividade_descricao" ON "tipo_atividade"("descricao");
