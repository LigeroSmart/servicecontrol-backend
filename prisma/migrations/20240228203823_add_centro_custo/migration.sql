-- CreateTable
CREATE TABLE "centro_custo" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,
    "situacao" VARCHAR(1) NOT NULL,

    CONSTRAINT "centro_custo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "centro_custo_descricao_uk" ON "centro_custo"("descricao");

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_centro_custo_id_fkey" FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_contrato" ADD CONSTRAINT "modelo_contrato_centro_custo_id_fkey" FOREIGN KEY ("centro_custo_id") REFERENCES "centro_custo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
