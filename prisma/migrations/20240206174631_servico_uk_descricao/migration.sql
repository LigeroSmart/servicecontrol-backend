/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `servico` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "servico_descricao_uk" ON "servico"("descricao");
