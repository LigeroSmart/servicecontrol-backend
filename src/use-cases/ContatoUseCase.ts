import { ModeloHorario } from '../entities/ModeloHorario';
import { ModeloHorarioAlreadyExists } from '../errors/ModeloHorarioAlreadyExists';
import { ContatoAlreadyExists } from '../errors/ContatoAlreadyExists';
import { ContatoNotFound } from '../errors/ContatoNotFound';
import { CreateContatoDTO, IContato, UpdateContatoDTO } from '../interfaces/Contato.interface';
import { DbContatoRepository } from '../repository/DbContatoRepository';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { Console } from 'console';

export class ContatoUseCase {
  constructor(
    private ContatoRepository: DbContatoRepository) 
  {
    ContatoRepository = ContatoRepository;
  }

  public async createContato(
    data: CreateContatoDTO
  ): Promise<IContato | null> {

    // const existsContato = await this.ContatoRepository.getByCodigo(
    //   codigo
    // );

    // if (existsContato) {
    //   throw new ContatoAlreadyExists();
    // }

    data.situacao = "A";

    const contato = await this.ContatoRepository.createContato({
      cliente_id: data.cliente_id,
      contato_ligero_id: data.contato_ligero_id,
      nome: data.nome,
      telefone: data.telefone,
      ramal: data.ramal,
      celular: data.celular,
      email: data.email,
      situacao: data.situacao
    });

    return contato;
  }

  public async getAll(): Promise<IContato[] | null> {
    const contato = await this.ContatoRepository.getAll();

    return contato;
  }

  public async getById(id: number): Promise<IContato | null> {
    const contato = await this.ContatoRepository.getById(id);

    if (!contato) {
      throw new ContatoNotFound();
    }

    return contato;
  }

  public async update(
    id: number, 
    data: UpdateContatoDTO
    ): Promise<IContato | null> {
    //const existsContato = await this.getById(id);
    const existsContato = await this.ContatoRepository.getById(id);

    if (!existsContato) {
      throw new ContatoNotFound();
    }

    const contato = await this.ContatoRepository.update(id, {
        cliente_id: data.cliente_id,
        contato_ligero_id: data.contato_ligero_id,
        nome: data.nome,
        telefone: data.telefone,
        ramal: data.ramal,
        celular: data.celular,
        email: data.email,
        situacao: data.situacao
    });

    return contato;
  }

  public async delete(id: number): Promise<IContato | null> {
    const existsContato = await this.getById(id);

    if (!existsContato) {
      throw new ContatoNotFound();
    }

    const contato = await this.ContatoRepository.delete(id);

    return contato;
  }
  
}
