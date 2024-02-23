export interface IAtividade {
    id?: number;
    usuario_id: number;
    //tipo_horario_id: number;
    tipo_atividade_id: number;
    ticket: string;
    codigo: string;
    data_inicio: Date;
    hora_inicio: Date;
    data_final: Date;
    hora_final: Date;
    assunto: string;
    descricao: string;
  }
  
  export interface CreateAtividadeDTO {
    usuario_id: number;
    //tipo_horario_id: number;
    tipo_atividade_id: number;
    ticket: string;
    codigo: string;
    data_inicio: Date;
    hora_inicio: Date;
    data_final: Date;
    hora_final: Date;
    assunto: string;
    descricao: string;
  }
  
  export interface UpdateAtividadeDTO {
    usuario_id: number;
    //tipo_horario_id: number;
    tipo_atividade_id: number;
    ticket: string;
    codigo: string;
    data_inicio: Date;
    hora_inicio: Date;
    data_final: Date;
    hora_final: Date;
    assunto: string;
    descricao: string;
  }