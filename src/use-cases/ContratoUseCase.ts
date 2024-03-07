import { ModeloHorario } from '../entities/ModeloHorario';
import { ModeloHorarioAlreadyExists } from '../errors/ModeloHorarioAlreadyExists';
import { ContratoAlreadyExists } from '../errors/ContratoAlreadyExists';
import { ContratoNotFound } from '../errors/ContratoNotFound';
import { CreateContratoDTO, IContrato, UpdateContratoDTO } from '../interfaces/Contrato.interface';
import { DbContratoRepository } from '../repository/DbContratoRepository';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { Console } from 'console';

export class ContratoUseCase {
  constructor(
    private ContratoRepository: DbContratoRepository) 
  {
    ContratoRepository = ContratoRepository;
  }

  public async createContrato(
    numero: string,
    data: CreateContratoDTO
  ): Promise<IContrato | null> {

    const existsContrato = await this.ContratoRepository.getByNumero(
      numero
    );

    if (existsContrato) {
      throw new ContratoAlreadyExists();
    }

    data.situacao = "A";

    let sInicioVigencia = (data.inicio_vigencia + 'T00:00:00');
    let sTerminoVigencia = (data.termino_vigencia + 'T00:00:00');
    let sTerminoContrato = (data.termino_contrato + 'T00:00:00');

    const _dataInicioVigencia = new Date(sInicioVigencia);
    const _dataTerminoVigencia = new Date(sTerminoVigencia);
    const _dataTerminoContrato = new Date(sTerminoContrato);

    const contrato = await this.ContratoRepository.createContrato({
      cliente_id: data.cliente_id,
      tipo_contrato_id: data.tipo_contrato_id,
      centro_custo_id: data.centro_custo_id,
      numero: data.numero,
      descricao: data.descricao,
      inicio_vigencia: _dataInicioVigencia,
      termino_vigencia: _dataTerminoVigencia,
      termino_contrato: _dataTerminoContrato,
      valor_mensal: data.valor_mensal,
      situacao: data.situacao
    });

    return contrato;
  }

  public async getAll(): Promise<IContrato[] | null> {
    const contrato = await this.ContratoRepository.getAll();

    return contrato;
  }

  public async getById(id: number): Promise<IContrato | null> {
    const contrato = await this.ContratoRepository.getById(id);

    if (!contrato) {
      throw new ContratoNotFound();
    }

    return contrato;
  }

  public async update(
    id: number, 
    data: UpdateContratoDTO
    ): Promise<IContrato | null> {
    //const existsContrato = await this.getById(id);
    const existsContrato = await this.ContratoRepository.getById(id);

    if (!existsContrato) {
      throw new ContratoNotFound();
    }

    let sInicioVigencia = (data.inicio_vigencia + 'T00:00:00');
    let sTerminoVigencia = (data.termino_vigencia + 'T00:00:00');
    let sTerminoContrato = (data.termino_contrato + 'T00:00:00');

    const _dataInicioVigencia = new Date(sInicioVigencia);
    const _dataTerminoVigencia = new Date(sTerminoVigencia);
    const _dataTerminoContrato = new Date(sTerminoContrato);

    const contrato = await this.ContratoRepository.update(id, {
        cliente_id: data.cliente_id,
        tipo_contrato_id: data.tipo_contrato_id,
        centro_custo_id: data.centro_custo_id,
        numero: data.numero,
        descricao: data.descricao,
        inicio_vigencia: _dataInicioVigencia,
        termino_vigencia: _dataTerminoVigencia,
        termino_contrato: _dataTerminoContrato,
        valor_mensal: data.valor_mensal,
        situacao: data.situacao
    });

    return contrato;
  }

  public async delete(id: number): Promise<IContrato | null> {
    const existsContrato = await this.getById(id);

    if (!existsContrato) {
      throw new ContratoNotFound();
    }

    const contrato = await this.ContratoRepository.delete(id);

    return contrato;
  }
  
}
