import { ModeloHorario } from '../entities/ModeloHorario';
import { ModeloHorarioAlreadyExists } from '../errors/ModeloHorarioAlreadyExists';
import { ClienteAlreadyExists } from '../errors/ClienteAlreadyExists';
import { ClienteNotFound } from '../errors/ClienteNotFound';
import { CreateClienteDTO, ICliente, UpdateClienteDTO } from '../interfaces/Cliente.interface';
import { DbClienteRepository } from '../repository/DbClienteRepository';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { Console } from 'console';

export class ClienteUseCase {
  constructor(
    private ClienteRepository: DbClienteRepository) 
  {
    ClienteRepository = ClienteRepository;
  }

  public async createCliente(
    codigo: number,
    data: CreateClienteDTO
  ): Promise<ICliente | null> {

    const existsCliente = await this.ClienteRepository.getByCodigo(
      codigo
    );

    if (existsCliente) {
      throw new ClienteAlreadyExists();
    }

    data.situacao = "A";

    const Cliente = await this.ClienteRepository.createCliente({
      modelo_horario_id: data.modelo_horario_id,
      codigo: data.codigo,
      cnpj: data.cnpj,
      ie: data.ie,
      abreviacao: data.abreviacao,
      nome_fantasia: data.nome_fantasia,
      razao_social: data.razao_social,
      cep: data.cep,
      endereco: data.endereco,
      bairro: data.bairro,
      cidade: data.cidade,
      uf: data.uf,
      site: data.site,
      observacao: data.observacao,
      situacao: data.situacao
    });

    return Cliente;
  }

  public async getAll(): Promise<ICliente[] | null> {
    const Cliente = await this.ClienteRepository.getAll();

    // if (!Cliente || Cliente.length === 0) {
    //   throw new ClienteNotFound();
    // }

    return Cliente;
  }

  public async getById(id: number): Promise<ICliente | null> {
    const Cliente = await this.ClienteRepository.getById(id);

    if (!Cliente) {
      throw new ClienteNotFound();
    }

    return Cliente;
  }

  public async getBySituacao(situacao: string): Promise<ICliente | null> {
    const cliente = await this.ClienteRepository.getBySituacao(situacao);

    if (!cliente) {
      throw new ClienteNotFound();
    }

    return cliente;
  }    

  public async update(
    id: number, 
    data: UpdateClienteDTO
    ): Promise<ICliente | null> {
    //const existsCliente = await this.getById(id);
    const existsCliente = await this.ClienteRepository.getById(id);

    if (!existsCliente) {
      throw new ClienteNotFound();
    }

    const Cliente = await this.ClienteRepository.update(id, {
        modelo_horario_id: data.modelo_horario_id,
        codigo: data.codigo,
        cnpj: data.cnpj,
        ie: data.ie,
        abreviacao: data.abreviacao,
        nome_fantasia: data.nome_fantasia,
        razao_social: data.razao_social,
        cep: data.cep,
        endereco: data.endereco,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        site: data.site,
        observacao: data.observacao,
        situacao: data.situacao,
    });

    return Cliente;
  }

  public async delete(id: number): Promise<ICliente | null> {
    const existsCliente = await this.getById(id);

    if (!existsCliente) {
      throw new ClienteNotFound();
    }

    const Cliente = await this.ClienteRepository.delete(id);

    return Cliente;
  }
  
}
