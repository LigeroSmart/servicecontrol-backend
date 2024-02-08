export class Atividade {
    id: number;
    usuario_id: number;
    tipo_horario_id: number;
    tipo_atividade_id: number;
    ticket: string;
    codigo: string;
    data_inicio: Date;
    hora_inicio: Date;
    data_final: Date;
    hora_final: Date;
    assunto: string;
    descricao: string;
    
    constructor(
        id: number,
        usuario_id: number,
        tipo_horario_id: number,
        tipo_atividade_id: number,
        ticket: string,
        codigo: string,
        data_inicio: Date,
        hora_inicio: Date,
        data_final: Date,
        hora_final: Date,
        assunto: string,
        descricao: string,
    ) {
        this.id = id;
        this.usuario_id = usuario_id;
        this.tipo_horario_id = tipo_horario_id;
        this.tipo_atividade_id = tipo_atividade_id;
        this.ticket = ticket;
        this.codigo = codigo;
        this.data_inicio = data_inicio;
        this.hora_inicio = hora_inicio;
        this.data_final = data_final;
        this.hora_final = hora_final;
        this.assunto = assunto;
        this.descricao = descricao;
    }
  }