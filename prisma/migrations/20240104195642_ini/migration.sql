-- CreateTable
CREATE TABLE "atividade" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "tipo_horario_id" INTEGER NOT NULL,
    "tipo_atividade_id" INTEGER NOT NULL,
    "ticket" VARCHAR(20),
    "codigo" VARCHAR(20),
    "tipo_atividadeid" INTEGER,
    "data_inicio" DATE,
    "hora_inicio" TIME(6),
    "data_final" DATE,
    "hora_final" TIME(6),
    "assunto" VARCHAR(100),
    "descricao" VARCHAR(1000),

    CONSTRAINT "atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER,
    "cnpj" VARCHAR(20),
    "ie" VARCHAR(20),
    "abreviacao" VARCHAR(20),
    "nome_fantasia" VARCHAR(60),
    "razao_social" VARCHAR(60),
    "cep" VARCHAR(10),
    "endereco" VARCHAR(80),
    "bairro" VARCHAR(60),
    "cidade" VARCHAR(60),
    "uf" VARCHAR(2),
    "site" VARCHAR(200),
    "observacao" VARCHAR(2000),
    "situacao" VARCHAR(1),

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contato" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "telefone" VARCHAR(20),
    "ramal" VARCHAR(10),
    "celular" VARCHAR(20),
    "email" VARCHAR(100),
    "situacao" VARCHAR(1) NOT NULL,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contrato" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "modelo_contrato_id" INTEGER,
    "tipo_contrato_id" INTEGER,
    "centro_custo_id" INTEGER,
    "numero" VARCHAR(20),
    "descricao" VARCHAR(2000),
    "inicio_vigencia" DATE,
    "termino_vigencia" DATE,
    "termino_contrato" DATE,
    "valor_mensal" DECIMAL,
    "situacao" VARCHAR(1),

    CONSTRAINT "contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40),
    "rota" VARCHAR(100),
    "ativo" VARCHAR(1),

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_contrato" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "tipo_contrato_id" INTEGER,
    "centro_custo_id" INTEGER,
    "descricao" VARCHAR(2000),
    "valor_mensal" DECIMAL,
    "situacao" VARCHAR(1),

    CONSTRAINT "modelo_contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_horario" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60),
    "situacao" VARCHAR(1),

    CONSTRAINT "modelo_horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_cobranca" (
    "id" SERIAL NOT NULL,
    "modelo_contrato_id" INTEGER,
    "ordem" INTEGER,
    "codigo" INTEGER,
    "nome" VARCHAR(60),
    "valor" DECIMAL,
    "bloqueado" VARCHAR(1),

    CONSTRAINT "modelo_regra_cobranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_cobranca_horario" (
    "id" SERIAL NOT NULL,
    "modelo_contrato_id" INTEGER NOT NULL,
    "tipo_horario_id" INTEGER,

    CONSTRAINT "modelo_regra_cobranca_horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_cobranca_servico" (
    "id" SERIAL NOT NULL,
    "servico_cliente_id" INTEGER NOT NULL,
    "modelo_regra_cobranca_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_cobranca_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_cobranca_tipo_atividade" (
    "id" SERIAL NOT NULL,
    "tipo_atividade_id" INTEGER NOT NULL,
    "modelo_regra_cobranca_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_cobranca_tipo_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_cobranca_tipo_chamado" (
    "id" SERIAL NOT NULL,
    "modelo_regra_cobranca_id" INTEGER NOT NULL,
    "tipo_chamado_id" INTEGER,
    "bloqueado" VARCHAR(1),

    CONSTRAINT "modelo_regra_cobranca_tipo_chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_franquia" (
    "id" SERIAL NOT NULL,
    "modelo_contrato_id" INTEGER NOT NULL,
    "qtd_horas" INTEGER,
    "valor_hora" DECIMAL,
    "qtd_meses" INTEGER,
    "frnquia_fixa" VARCHAR(1),

    CONSTRAINT "modelo_regra_franquia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_franquia_horario" (
    "id" SERIAL NOT NULL,
    "modelo_regra_franquia_id" INTEGER NOT NULL,
    "modelo_horario_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_franquia_horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_franquia_servico" (
    "id" SERIAL NOT NULL,
    "servico_cliente_id" INTEGER NOT NULL,
    "modelo_regra_franquia_id" INTEGER,

    CONSTRAINT "modelo_regra_franquia_servico_pkey" PRIMARY KEY ("id","servico_cliente_id")
);

-- CreateTable
CREATE TABLE "modelo_regra_franquia_tipo_atividade" (
    "id" SERIAL NOT NULL,
    "tipo_atividade_id" INTEGER NOT NULL,
    "modelo_regra_franquia_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_franquia_tipo_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_franquia_tipo_chamado" (
    "id" SERIAL NOT NULL,
    "modelo_regra_franquia_id" INTEGER NOT NULL,
    "tipo_chamado_id" INTEGER NOT NULL,
    "bloqueado" VARCHAR(1),

    CONSTRAINT "modelo_regra_franquia_tipo_chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_sla_contato" (
    "id" SERIAL NOT NULL,
    "modelo_contrato_id" INTEGER NOT NULL,
    "contato_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_sla_contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_sla_servico" (
    "id" SERIAL NOT NULL,
    "modelo_contrato_id" INTEGER NOT NULL,
    "servico_cliente_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_sla_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modelo_regra_sla_sla" (
    "id" SERIAL NOT NULL,
    "modelo_contrato_id" INTEGER NOT NULL,
    "sla_id" INTEGER NOT NULL,

    CONSTRAINT "modelo_regra_sla_sla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40),
    "situacao" VARCHAR(1),

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_menu" (
    "id" SERIAL NOT NULL,
    "perfil_id" INTEGER,
    "menu_id" INTEGER,

    CONSTRAINT "perfil_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_cobranca" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER,
    "ordem" INTEGER,
    "codigo" INTEGER,
    "nome" VARCHAR(60),
    "valor" DECIMAL,
    "bloqueado" VARCHAR(1),

    CONSTRAINT "regra_cobranca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_cobranca_horario" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "tipo_horario_id" INTEGER,

    CONSTRAINT "regra_cobranca_horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_cobranca_servico" (
    "id" SERIAL NOT NULL,
    "servico_cliente_id" INTEGER NOT NULL,
    "regra_cobranca_id" INTEGER NOT NULL,

    CONSTRAINT "regra_cobranca_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_cobranca_tipo_atividade" (
    "id" SERIAL NOT NULL,
    "tipo_atividade_id" INTEGER NOT NULL,
    "regra_cobranca_id" INTEGER NOT NULL,

    CONSTRAINT "regra_cobranca_tipo_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_cobranca_tipo_chamado" (
    "id" SERIAL NOT NULL,
    "regra_cobranca_id" INTEGER NOT NULL,
    "tipo_chamado_id" INTEGER,
    "bloqueado" VARCHAR(1),

    CONSTRAINT "regra_cobranca_tipo_chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_franquia" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "qtd_horas" INTEGER,
    "valor_hora" DECIMAL,
    "qtd_meses" INTEGER,
    "frnquia_fixa" VARCHAR(1),

    CONSTRAINT "regra_franquia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_franquia_horario" (
    "id" SERIAL NOT NULL,
    "regra_franquia_id" INTEGER NOT NULL,
    "modelo_horario_id" INTEGER NOT NULL,

    CONSTRAINT "regra_franquia_horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_franquia_servico" (
    "id" SERIAL NOT NULL,
    "servico_cliente_id" INTEGER NOT NULL,
    "regra_franquia_id" INTEGER,

    CONSTRAINT "regra_franquia_servico_pkey" PRIMARY KEY ("id","servico_cliente_id")
);

-- CreateTable
CREATE TABLE "regra_franquia_tipo_atividade" (
    "id" SERIAL NOT NULL,
    "tipo_atividade_id" INTEGER NOT NULL,
    "regra_franquia_id" INTEGER NOT NULL,

    CONSTRAINT "regra_franquia_tipo_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_franquia_tipo_chamado" (
    "id" SERIAL NOT NULL,
    "regra_franquia_id" INTEGER NOT NULL,
    "tipo_chamado_id" INTEGER NOT NULL,
    "bloqueado" VARCHAR(1),

    CONSTRAINT "regra_franquia_tipo_chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_sla_contato" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "contato_id" INTEGER NOT NULL,

    CONSTRAINT "regra_sla_contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_sla_servico" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "servico_cliente_id" INTEGER NOT NULL,

    CONSTRAINT "regra_sla_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regra_sla_sla" (
    "id" SERIAL NOT NULL,
    "contrato_id" INTEGER NOT NULL,
    "sla_id" INTEGER NOT NULL,

    CONSTRAINT "regra_sla_sla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60),
    "situacao" VARCHAR(1),

    CONSTRAINT "servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servico_cliente" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER,
    "servico_id" INTEGER,

    CONSTRAINT "servico_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sla" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(60),
    "situacao" VARCHAR(1),

    CONSTRAINT "sla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_atividade" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40) NOT NULL,
    "situacao" VARCHAR(1) NOT NULL,

    CONSTRAINT "tipo_atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_chamado" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(40),
    "situacao" VARCHAR(1),

    CONSTRAINT "tipo_chamado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_contrato" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(80),
    "cobranca_unica" VARCHAR(1),
    "situacao" VARCHAR(1),

    CONSTRAINT "tipo_contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_horario" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(20) NOT NULL,
    "situacao" VARCHAR(1) NOT NULL,

    CONSTRAINT "tipo_horario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "perfil_id" INTEGER NOT NULL,
    "nome" VARCHAR(40),
    "email" VARCHAR(100),
    "senha" VARCHAR(20),
    "administrador" VARCHAR(1),
    "situacao" VARCHAR(1),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_uk" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "tipo_atividade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_tipo_horario_id_fkey" FOREIGN KEY ("tipo_horario_id") REFERENCES "tipo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "atividade" ADD CONSTRAINT "atividade_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contato" ADD CONSTRAINT "contato_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contrato" ADD CONSTRAINT "contrato_tipo_contrato_id_fkey" FOREIGN KEY ("tipo_contrato_id") REFERENCES "tipo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_contrato" ADD CONSTRAINT "modelo_contrato_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_contrato" ADD CONSTRAINT "modelo_contrato_tipo_contrato_id_fkey" FOREIGN KEY ("tipo_contrato_id") REFERENCES "tipo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca" ADD CONSTRAINT "modelo_regra_cobranca_modelo_contrato_id_fkey" FOREIGN KEY ("modelo_contrato_id") REFERENCES "modelo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_horario" ADD CONSTRAINT "modelo_regra_cobranca_horario_modelo_contrato_id_fkey" FOREIGN KEY ("modelo_contrato_id") REFERENCES "modelo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_horario" ADD CONSTRAINT "modelo_regra_cobranca_horario_tipo_horario_id_fkey" FOREIGN KEY ("tipo_horario_id") REFERENCES "tipo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_servico" ADD CONSTRAINT "modelo_regra_cobranca_servico_modelo_regra_cobranca_id_fkey" FOREIGN KEY ("modelo_regra_cobranca_id") REFERENCES "modelo_regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_servico" ADD CONSTRAINT "modelo_regra_cobranca_servico_servico_cliente_id_fkey" FOREIGN KEY ("servico_cliente_id") REFERENCES "servico_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_tipo_atividade" ADD CONSTRAINT "modelo_regra_cobranca_tipo_ativid_modelo_regra_cobranca_id_fkey" FOREIGN KEY ("modelo_regra_cobranca_id") REFERENCES "modelo_regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_tipo_atividade" ADD CONSTRAINT "modelo_regra_cobranca_tipo_atividade_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "tipo_atividade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_tipo_chamado" ADD CONSTRAINT "modelo_regra_cobranca_tipo_chamad_modelo_regra_cobranca_id_fkey" FOREIGN KEY ("modelo_regra_cobranca_id") REFERENCES "modelo_regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_cobranca_tipo_chamado" ADD CONSTRAINT "modelo_regra_cobranca_tipo_chamado_tipo_chamado_id_fkey" FOREIGN KEY ("tipo_chamado_id") REFERENCES "tipo_chamado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia" ADD CONSTRAINT "modelo_regra_franquia_modelo_contrato_id_fkey" FOREIGN KEY ("modelo_contrato_id") REFERENCES "modelo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_horario" ADD CONSTRAINT "modelo_regra_franquia_horario_modelo_horario_id_fkey" FOREIGN KEY ("modelo_horario_id") REFERENCES "modelo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_horario" ADD CONSTRAINT "modelo_regra_franquia_horario_modelo_regra_franquia_id_fkey" FOREIGN KEY ("modelo_regra_franquia_id") REFERENCES "modelo_regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_servico" ADD CONSTRAINT "modelo_regra_franquia_servico_modelo_regra_franquia_id_fkey" FOREIGN KEY ("modelo_regra_franquia_id") REFERENCES "modelo_regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_servico" ADD CONSTRAINT "modelo_regra_franquia_servico_servico_cliente_id_fkey" FOREIGN KEY ("servico_cliente_id") REFERENCES "servico_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_tipo_atividade" ADD CONSTRAINT "modelo_regra_franquia_tipo_ativid_modelo_regra_franquia_id_fkey" FOREIGN KEY ("modelo_regra_franquia_id") REFERENCES "modelo_regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_tipo_atividade" ADD CONSTRAINT "modelo_regra_franquia_tipo_atividade_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "tipo_atividade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_tipo_chamado" ADD CONSTRAINT "modelo_regra_franquia_tipo_chamad_modelo_regra_franquia_id_fkey" FOREIGN KEY ("modelo_regra_franquia_id") REFERENCES "modelo_regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_franquia_tipo_chamado" ADD CONSTRAINT "modelo_regra_franquia_tipo_chamado_tipo_chamado_id_fkey" FOREIGN KEY ("tipo_chamado_id") REFERENCES "tipo_chamado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_sla_contato" ADD CONSTRAINT "modelo_regra_sla_contato_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_sla_contato" ADD CONSTRAINT "modelo_regra_sla_contato_modelo_contrato_id_fkey" FOREIGN KEY ("modelo_contrato_id") REFERENCES "modelo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_sla_servico" ADD CONSTRAINT "modelo_regra_sla_servico_modelo_contrato_id_fkey" FOREIGN KEY ("modelo_contrato_id") REFERENCES "modelo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_sla_servico" ADD CONSTRAINT "modelo_regra_sla_servico_servico_cliente_id_fkey" FOREIGN KEY ("servico_cliente_id") REFERENCES "servico_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_sla_sla" ADD CONSTRAINT "modelo_regra_sla_sla_modelo_contrato_id_fkey" FOREIGN KEY ("modelo_contrato_id") REFERENCES "modelo_contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modelo_regra_sla_sla" ADD CONSTRAINT "modelo_regra_sla_sla_sla_id_fkey" FOREIGN KEY ("sla_id") REFERENCES "sla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perfil_menu" ADD CONSTRAINT "perfil_menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "perfil_menu" ADD CONSTRAINT "perfil_menu_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca" ADD CONSTRAINT "regra_cobranca_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_horario" ADD CONSTRAINT "regra_cobranca_horario_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_horario" ADD CONSTRAINT "regra_cobranca_horario_tipo_horario_id_fkey" FOREIGN KEY ("tipo_horario_id") REFERENCES "tipo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_servico" ADD CONSTRAINT "regra_cobranca_servico_regra_cobranca_id_fkey" FOREIGN KEY ("regra_cobranca_id") REFERENCES "regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_servico" ADD CONSTRAINT "regra_cobranca_servico_servico_cliente_id_fkey" FOREIGN KEY ("servico_cliente_id") REFERENCES "servico_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_tipo_atividade" ADD CONSTRAINT "regra_cobranca_tipo_atividade_regra_cobranca_id_fkey" FOREIGN KEY ("regra_cobranca_id") REFERENCES "regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_tipo_atividade" ADD CONSTRAINT "regra_cobranca_tipo_atividade_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "tipo_atividade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_tipo_chamado" ADD CONSTRAINT "regra_cobranca_tipo_chamado_regra_cobranca_id_fkey" FOREIGN KEY ("regra_cobranca_id") REFERENCES "regra_cobranca"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_cobranca_tipo_chamado" ADD CONSTRAINT "regra_cobranca_tipo_chamado_tipo_chamado_id_fkey" FOREIGN KEY ("tipo_chamado_id") REFERENCES "tipo_chamado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia" ADD CONSTRAINT "regra_franquia_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_horario" ADD CONSTRAINT "regra_franquia_horario_modelo_horario_id_fkey" FOREIGN KEY ("modelo_horario_id") REFERENCES "modelo_horario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_horario" ADD CONSTRAINT "regra_franquia_horario_regra_franquia_id_fkey" FOREIGN KEY ("regra_franquia_id") REFERENCES "regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_servico" ADD CONSTRAINT "regra_franquia_servico_regra_franquia_id_fkey" FOREIGN KEY ("regra_franquia_id") REFERENCES "regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_servico" ADD CONSTRAINT "regra_franquia_servico_servico_cliente_id_fkey" FOREIGN KEY ("servico_cliente_id") REFERENCES "servico_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_tipo_atividade" ADD CONSTRAINT "regra_franquia_tipo_atividade_regra_franquia_id_fkey" FOREIGN KEY ("regra_franquia_id") REFERENCES "regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_tipo_atividade" ADD CONSTRAINT "regra_franquia_tipo_atividade_tipo_atividade_id_fkey" FOREIGN KEY ("tipo_atividade_id") REFERENCES "tipo_atividade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_tipo_chamado" ADD CONSTRAINT "regra_franquia_tipo_chamado_regra_franquia_id_fkey" FOREIGN KEY ("regra_franquia_id") REFERENCES "regra_franquia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_franquia_tipo_chamado" ADD CONSTRAINT "regra_franquia_tipo_chamado_tipo_chamado_id_fkey" FOREIGN KEY ("tipo_chamado_id") REFERENCES "tipo_chamado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_sla_contato" ADD CONSTRAINT "regra_sla_contato_contato_id_fkey" FOREIGN KEY ("contato_id") REFERENCES "contato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_sla_contato" ADD CONSTRAINT "regra_sla_contato_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_sla_servico" ADD CONSTRAINT "regra_sla_servico_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_sla_servico" ADD CONSTRAINT "regra_sla_servico_servico_cliente_id_fkey" FOREIGN KEY ("servico_cliente_id") REFERENCES "servico_cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_sla_sla" ADD CONSTRAINT "regra_sla_sla_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "contrato"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "regra_sla_sla" ADD CONSTRAINT "regra_sla_sla_sla_id_fkey" FOREIGN KEY ("sla_id") REFERENCES "sla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servico_cliente" ADD CONSTRAINT "servico_cliente_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servico_cliente" ADD CONSTRAINT "servico_cliente_servico_id_fkey" FOREIGN KEY ("servico_id") REFERENCES "servico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfil"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
