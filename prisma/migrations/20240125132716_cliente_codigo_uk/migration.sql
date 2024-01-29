/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - Made the column `codigo` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cliente" ALTER COLUMN "codigo" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cliente_codigo_uk" ON "cliente"("codigo");
