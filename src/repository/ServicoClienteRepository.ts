import { IServicoCliente } from '../interfaces/Servico.Cliente.interface';

export interface ServicoClienteRepository {
  createServicoCliente(data: IServicoCliente): Promise<IServicoCliente | null>;
  getAll(): Promise<IServicoCliente[] | null>;
  getById(id: number): Promise<IServicoCliente | null>;
  getByUK(cliente_id: number, servico_id: number): Promise<IServicoCliente | null>;
  getByClienteId(cliente_id: number): Promise<IServicoCliente | null>;
  update(id: number, data: IServicoCliente): Promise<IServicoCliente | null>;
  delete(id: number): Promise<IServicoCliente | null>;
}