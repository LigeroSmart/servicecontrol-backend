/*
  Warnings:

  - Added the required column `tipo_horario_id` to the `modelo_horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "modelo_horario" ADD COLUMN     "inicio" TIME(6),
ADD COLUMN     "termino" TIME(6),
ADD COLUMN     "tipo_horario_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "modelo_horario" ADD CONSTRAINT "modelo_horario_tipo_horario_id_fkey" FOREIGN KEY ("tipo_horario_id") REFERENCES "tipo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
