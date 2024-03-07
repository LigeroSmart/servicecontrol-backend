/*
  Warnings:

  - You are about to drop the column `codigo` on the `contato` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "contato_codigo_uk";

-- AlterTable
ALTER TABLE "contato" DROP COLUMN "codigo";
