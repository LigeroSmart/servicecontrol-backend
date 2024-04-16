/*
  Warnings:

  - The primary key for the `regra_franquia_servico` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "regra_franquia_servico" DROP CONSTRAINT "regra_franquia_servico_pkey",
ADD CONSTRAINT "regra_franquia_servico_pkey" PRIMARY KEY ("id");
