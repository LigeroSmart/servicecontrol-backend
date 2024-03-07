import { CreateContratoDTO, IContrato } from '../interfaces/Contrato.interface';

export interface ContratoRepository {
  createContrato(data: CreateContratoDTO): Promise<IContrato | null>;
  getAll(): Promise<IContrato[] | null>;
  getById(id: number): Promise<IContrato | null>;
  getByNumero(numero: string): Promise<IContrato | null>;
  update(id: number, data: IContrato): Promise<IContrato | null>;
  delete(id: number): Promise<IContrato | null>;
}