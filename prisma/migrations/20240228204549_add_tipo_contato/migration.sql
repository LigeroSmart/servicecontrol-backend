-- CreateTable
CREATE TABLE "tipo_contato" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,
    "situacao" VARCHAR(1) NOT NULL,

    CONSTRAINT "tipo_contato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_contato_descricao_uk" ON "tipo_contato"("descricao");
