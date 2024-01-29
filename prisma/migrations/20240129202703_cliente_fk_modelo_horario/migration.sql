/*
  Warnings:

  - Made the column `modelo_horario_id` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cliente" ALTER COLUMN "modelo_horario_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_modelo_horario_id_fkey" FOREIGN KEY ("modelo_horario_id") REFERENCES "modelo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
