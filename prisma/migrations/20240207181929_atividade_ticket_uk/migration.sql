/*
  Warnings:

  - A unique constraint covering the columns `[ticket]` on the table `atividade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "atividade_ticket_uk" ON "atividade"("ticket");
