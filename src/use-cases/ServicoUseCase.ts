import { ServicoAlreadyExists } from '../errors/ServicoAlreadyExists';
import { ServicoInativo } from '../errors/ServicoInativo';
import { ServicoNotFound } from '../errors/ServicoNotFound';
import { CreateServicoDTO, IServico, UpdateServicoDTO } from '../interfaces/servico.interface';
import { DbServicoRepository } from '../repository/DbServicoRepository';
import { Console } from 'console';

export class ServicoUseCase {
  constructor(
    private ServicoRepository: DbServicoRepository) {
      ServicoRepository = ServicoRepository;
  }

  public async createServico(
    descricao: string,
    data: CreateServicoDTO
  ): Promise<IServico | null> {

    const existsServicoByDescricao = await this.ServicoRepository.getByUK(
      descricao
    );

    if (existsServicoByDescricao) {
      throw new ServicoAlreadyExists();
    }

    console.log( data );
    
    const servico = await this.ServicoRepository.createServico({
      descricao: data.descricao,
      situacao: data.situacao,
      servico_ligero_id: data.servico_ligero_id
    });

    return servico;
  }

  public async getAll(): Promise<IServico[] | null> {
    const servico = await this.ServicoRepository.getAll();

    // if (!Servico || Servico.length === 0) {
    //   throw new ServicoNotFound();
    // }

    return servico;
  }

  public async getById(id: number): Promise<IServico | null> {
    const servico = await this.ServicoRepository.getById(id);

    if (!servico) {
      throw new ServicoNotFound();
    }

    return servico;
  }

  public async update(
    id: number, 
    data: UpdateServicoDTO
    ): Promise<IServico | null> {
    const existsServico = await this.getById(id);

    if (!existsServico) {
      throw new ServicoNotFound();
    }

    const servico = await this.ServicoRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
      servico_ligero_id: data.servico_ligero_id
    });

    return servico;
  }

  public async delete(id: number): Promise<IServico | null> {
    const existsServico = await this.getById(id);

    if (!existsServico) {
      throw new ServicoNotFound();
    }

    const servico = await this.ServicoRepository.delete(id);

    return servico;
  }
  
}
