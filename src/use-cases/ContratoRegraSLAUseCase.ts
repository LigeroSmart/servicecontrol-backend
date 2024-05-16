// import { ContratoRegraSlaAlreadyExists } from '../errors/ContratoRegraSlaAlreadyExists';
import { ContratoRegraSlaNotFound } from '../errors/ContratoRegraSLANotFound';
import { ContratoNotFound } from '../errors/ContratoNotFound';
import { CreateContratoRegraSlaDTO, IContratoRegraSla, UpdateContratoRegraSlaDTO } from '../interfaces/ContratoRegraSLA.interface';
import { DbContratoRegraSLARepository } from '../repository/DbContratoRegraSLARepository';
import { Console } from 'console';
import { Prisma } from '@prisma/client';

export class ContratoRegraSlaUseCase {
  constructor(
    private contratoRegraSlaRepository: DbContratoRegraSLARepository
) {
    
    this.contratoRegraSlaRepository = contratoRegraSlaRepository;
  }

  public async createContratoRegraSla(
    //data: CreateContratoRegraSlaDTO,
    contrato_id: number,
    contato: [],
    servico: [],
    sla: []
  ): Promise<IContratoRegraSla | null> {

    const contratoRegraSlaIncluir = await this.contratoRegraSlaRepository.createContratoRegraSLA(
      {
        contrato_id: contrato_id
      },
      contato,
      servico,
      sla
    );

    //let idContratoRegraSla : number = contratoRegraSlaIncluir.id;
   
    return contratoRegraSlaIncluir;
  }

  public async getAll(contrato_id: number): Promise<IContratoRegraSla[] | null> {
    const contratoRegraSla = await this.contratoRegraSlaRepository.getAll(contrato_id);

    // if (!contratoRegraSla || contratoRegraSla.length === 0) {
    //   throw new ContratoRegraSlaNotFound();
    // }

    return contratoRegraSla;
  }

  
  public async getById(id: number): Promise<IContratoRegraSla | null> {
    const contratoRegraSla = await this.contratoRegraSlaRepository.getById(id);

    // if (!contratoRegraSla) {
    //   throw new ContratoRegraSlaNotFound();
    // }

    return contratoRegraSla;
  }

  public async update(
    id: number, 
    data: UpdateContratoRegraSlaDTO,
    contato: [],
    servico: [],
    sla: []
    ): Promise<IContratoRegraSla | null> {
    
    // const existsContratoRegraSla = await this.getById(id);

    // if (!existsContratoRegraSla) {
    //   throw new ContratoRegraSlaNotFound();
    // }
   
    const contratoRegraSla = await this.contratoRegraSlaRepository.update(
      data.contrato_id,
      contato,
      servico,
      sla
  );

    return contratoRegraSla;
  }

  public async delete(contrato_id: number): Promise<IContratoRegraSla | null> {
    // const existsContratoRegraSla = await this.getById(id);

    // if (!existsContratoRegraSla) {
    //   throw new ContratoRegraSlaNotFound();
    // }

    const contratoRegraSla = await this.contratoRegraSlaRepository.delete(contrato_id);

    return contratoRegraSla;

  }
  
}
