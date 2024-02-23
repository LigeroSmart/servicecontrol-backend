/*
  Warnings:

  - You are about to drop the column `tipo_horario_id` on the `atividade` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "atividade" DROP CONSTRAINT "atividade_tipo_horario_id_fkey";

-- AlterTable
ALTER TABLE "atividade" DROP COLUMN "tipo_horario_id";
