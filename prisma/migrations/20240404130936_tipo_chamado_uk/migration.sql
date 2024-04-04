/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `tipo_chamado` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "uk_tipo_chamado_descricao" ON "tipo_chamado"("descricao");
