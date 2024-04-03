import { Prisma, PrismaClient } from '@prisma/client';
import { IContratoRegraCobranca } from '../interfaces/ContratoRegraCobranca.interface';

export interface ContratoRegraCobrancaRepository {
  getTransacao(): Promise<any>;
  
  createContratoRegraCobranca(
    trx:Prisma.TransactionClient, 
    data: IContratoRegraCobranca,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []    
  ): Promise<IContratoRegraCobranca | null>;
  
  getAll(contrato_id: number): Promise<IContratoRegraCobranca[] | null>;
  
  getById(id: number): Promise<IContratoRegraCobranca | null>;
  
  //update(id: number, data: IContratoRegraCobranca): Promise<IContratoRegraCobranca | null>;
  update(
    id: number, 
    trx : any,
    data: IContratoRegraCobranca,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraCobranca | null>;
 
  delete(id: number): Promise<IContratoRegraCobranca | null>;
 
  deleteHorario(regra_contrato_id: number): Promise<IContratoRegraCobranca | null>;
}