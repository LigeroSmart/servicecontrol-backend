import { CreateClienteDTO, ICliente } from '../interfaces/Cliente.interface';

export interface ClienteRepository {
  createCliente(data: CreateClienteDTO): Promise<ICliente | null>;
  getAll(): Promise<ICliente[] | null>;
  getById(id: number): Promise<ICliente | null>;
  getByCodigo(codigo: number): Promise<ICliente | null>;
  update(id: number, data: ICliente): Promise<ICliente | null>;
  delete(id: number): Promise<ICliente | null>;
}