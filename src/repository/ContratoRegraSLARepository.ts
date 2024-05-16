import { Prisma, PrismaClient } from '@prisma/client';
import { IContratoRegraSla } from '../interfaces/ContratoRegraSLA.interface';

export interface ContratoRegraSlaRepository {

  createContratoRegraSLA(
    data: IContratoRegraSla,
    contato: [], 
    servico: [], 
    sla: []
  ): Promise<IContratoRegraSla | null>;
  
  getAll(contrato_id: number): Promise<IContratoRegraSla[] | null>;
  
  getById(id: number): Promise<IContratoRegraSla | null>;
  
  update(
    contrato_id: number, 
    //data: IContratoRegraSla,
    contato: [],
    servico: [],
    sla: []
  ): Promise<IContratoRegraSla | null>;
 
  delete(contrato_id: number): Promise<IContratoRegraSla | null>;
 
  //deleteHorario(regra_contrato_id: number): Promise<IContratoRegraSla | null>;
}