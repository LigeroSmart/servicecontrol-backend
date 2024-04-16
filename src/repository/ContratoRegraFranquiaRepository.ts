import { Prisma, PrismaClient } from '@prisma/client';
import { IContratoRegraFranquia } from '../interfaces/ContratoRegraFranquia.interface';

export interface ContratoRegraFranquiaRepository {

  createContratoRegraFranquia(
    data: IContratoRegraFranquia,
    horario: [], 
    servico: [], 
    tipo_atividade: [], 
    tipo_chamado: []    
  ): Promise<IContratoRegraFranquia | null>;
  
  getAll(contrato_id: number): Promise<IContratoRegraFranquia[] | null>;
  
  getById(id: number): Promise<IContratoRegraFranquia | null>;
  
  update(
    id: number, 
    data: IContratoRegraFranquia,
    horario: [],
    servico: [],
    tipo_atividade: [],
    tipo_chamado: []
  ): Promise<IContratoRegraFranquia | null>;
 
  delete(id: number): Promise<IContratoRegraFranquia | null>;
 
  //deleteHorario(regra_contrato_id: number): Promise<IContratoRegraFranquia | null>;
}