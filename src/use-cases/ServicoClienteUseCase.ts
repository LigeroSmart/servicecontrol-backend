import { ServicoClienteAlreadyExists } from '../errors/ServicoClienteAlreadyExists';
import { ServicoClienteNotFound } from '../errors/ServicoClienteNotFound';
import { CreateServicoClienteDTO, IServicoCliente, UpdateServicoClienteDTO } from '../interfaces/Servico.Cliente.interface';
import { DbServicoClienteRepository } from '../repository/DbServicoClienteRepository';
import { Console } from 'console';

export class ServicoClienteUseCase {
  constructor(
    private ServicoClienteRepository: DbServicoClienteRepository
  ) 
  {
      ServicoClienteRepository = ServicoClienteRepository;
  }

  public async createServicoCliente(
    cliente_id: number,
    servico_id: number,
    data: CreateServicoClienteDTO
  ): Promise<IServicoCliente | null> {

    const existsServicoClienteByUK = await this.ServicoClienteRepository.getByUK(
      cliente_id,
      servico_id,
    );

    if (existsServicoClienteByUK) {
      throw new ServicoClienteAlreadyExists();
    }

    const servicoCliente = await this.ServicoClienteRepository.createServicoCliente({
      servico_id: data.servico_id,
      cliente_id: data.cliente_id
    });

    return servicoCliente;
  }

  public async getAll(): Promise<IServicoCliente[] | null> {
    const servicoCliente = await this.ServicoClienteRepository.getAll();

    // if (!ServicoCliente || ServicoCliente.length === 0) {
    //   throw new ServicoClienteNotFound();
    // }

    return servicoCliente;
  }

  public async getById(id: number): Promise<IServicoCliente | null> {
    const servicoCliente = await this.ServicoClienteRepository.getById(id);

    if (!servicoCliente) {
      throw new ServicoClienteNotFound();
    }

    return servicoCliente;
  }

  public async getByClienteId(cliente_id: number): Promise<IServicoCliente | null> {
    const servicoCliente = await this.ServicoClienteRepository.getByClienteId(cliente_id);

    if (!servicoCliente) {
      throw new ServicoClienteNotFound();
    }

    return servicoCliente;
  }  


  public async getByServicoId(servico_id: number): Promise<IServicoCliente | null> {
    const servicoCliente = await this.ServicoClienteRepository.getByServicoId(servico_id);

    if (!servicoCliente) {
      throw new ServicoClienteNotFound();
    }

    return servicoCliente;
  }    

  public async update(
    id: number, 
    data: UpdateServicoClienteDTO
    ): Promise<IServicoCliente | null> {
    const existsServicoCliente = await this.getById(id);

    if (!existsServicoCliente) {
      throw new ServicoClienteNotFound();
    }

    const servicoCliente = await this.ServicoClienteRepository.update(id, {
      cliente_id: data.cliente_id,
      servico_id: data.servico_id,
    });

    return servicoCliente;
  }

  public async delete(id: number): Promise<IServicoCliente | null> {
    const existsServicoCliente = await this.getById(id);

    if (!existsServicoCliente) {
      throw new ServicoClienteNotFound();
    }

    const servicoCliente = await this.ServicoClienteRepository.delete(id);

    return servicoCliente;
  }
  
}
