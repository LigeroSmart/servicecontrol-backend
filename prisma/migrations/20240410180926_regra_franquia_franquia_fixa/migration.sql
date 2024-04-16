/*
  Warnings:

  - You are about to drop the column `frnquia_fixa` on the `regra_franquia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "regra_franquia" DROP COLUMN "frnquia_fixa",
ADD COLUMN     "franquia_fixa" VARCHAR(1);
