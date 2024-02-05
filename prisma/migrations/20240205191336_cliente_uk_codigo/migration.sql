/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `contato` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contato_codigo_uk" ON "contato"("codigo");
