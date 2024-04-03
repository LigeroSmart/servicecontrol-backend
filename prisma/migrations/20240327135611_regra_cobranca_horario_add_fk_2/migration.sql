/*
  Warnings:

  - You are about to drop the column `contrato_id` on the `regra_cobranca_horario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "regra_cobranca_horario" DROP CONSTRAINT "regra_cobranca_horario_contrato_id_fkey";

-- AlterTable
ALTER TABLE "regra_cobranca_horario" DROP COLUMN "contrato_id",
ADD COLUMN     "regra_cobranca_id" INTEGER;

-- AddForeignKey
ALTER TABLE "regra_cobranca_horario" ADD CONSTRAINT "regra_cobranca_horario_regra_cobranca_id_fkey" FOREIGN KEY ("regra_cobranca_id") REFERENCES "regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
