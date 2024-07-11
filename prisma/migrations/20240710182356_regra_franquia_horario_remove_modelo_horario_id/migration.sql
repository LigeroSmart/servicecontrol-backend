/*
  Warnings:

  - You are about to drop the column `modelo_horario_id` on the `regra_franquia_horario` table. All the data in the column will be lost.
  - Added the required column `tipo_horario_id` to the `regra_franquia_horario` table without a default value. This is not possible if the table is not empty.
  - Made the column `descricao` on table `sla` required. This step will fail if there are existing NULL values in that column.
  - Made the column `situacao` on table `sla` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "regra_franquia_horario" DROP CONSTRAINT "regra_franquia_horario_modelo_horario_id_fkey";

-- AlterTable
ALTER TABLE "regra_franquia_horario" DROP COLUMN "modelo_horario_id",
ADD COLUMN     "tipo_horario_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sla" ALTER COLUMN "descricao" SET NOT NULL,
ALTER COLUMN "situacao" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "regra_franquia_horario" ADD CONSTRAINT "regra_franquia_horario_tipo_horario_fkey" FOREIGN KEY ("tipo_horario_id") REFERENCES "tipo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
