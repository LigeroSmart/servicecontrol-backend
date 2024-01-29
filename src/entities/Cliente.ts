export class Cliente {
    id: number;
    modelo_horario_id: number;
    codigo: number;
    cnpj: string;
    ie: string;
    abreviacao: string;
    nome_fantasia: string;
    razao_social: string;
    cep: string;
    endereco: string;
    bairro: string;
    cidade: string;
    uf: string;
    site: string;
    observacao: string;
    situacao: string;
  
    constructor(
      id: number,
      modelo_horario_id: number,
      codigo: number,
      cnpj: string,
      ie: string,
      abreviacao: string,
      nome_fantasia: string,
      razao_social: string,
      cep: string,
      endereco: string,
      bairro: string,
      cidade: string,
      uf: string,
      site: string,
      observacao: string,
      situacao: string,
    ) {
      this.id = id;
      this.modelo_horario_id = modelo_horario_id;
      this.codigo = codigo;
      this.cnpj = cnpj;
      this.ie = ie;
      this.abreviacao = abreviacao;
      this.nome_fantasia = nome_fantasia;
      this.razao_social = razao_social;
      this.cep = cep;
      this.endereco = endereco;
      this.bairro = bairro;
      this.cidade = cidade;
      this.uf = uf;
      this.site = site;
      this.observacao = observacao;
      this.situacao = situacao;
    }
  }