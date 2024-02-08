/*
  Warnings:

  - Made the column `ticket` on table `atividade` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "atividade" ALTER COLUMN "ticket" SET NOT NULL;
