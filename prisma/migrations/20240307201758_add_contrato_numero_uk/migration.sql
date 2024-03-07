/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `contrato` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contrato_numero_uk" ON "contrato"("numero");
