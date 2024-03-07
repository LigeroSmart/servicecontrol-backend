import { Router } from 'express';
import { DbClienteRepository } from '../repository/DbClienteRepository';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { DbTipoContratoRepository } from '../repository/DbTipoContratoRepository';
import { TipoContratoUseCase } from '../use-cases/TipoContratoUseCase';
import { DbCentroCustoRepository } from '../repository/DbCentroCustoRepository';
import { CentroCustoUseCase } from '../use-cases/CentroCustoUseCase';
import { DbContratoRepository } from '../repository/DbContratoRepository';
import { ContratoUseCase } from '../use-cases/ContratoUseCase';
import { ContratoController } from '../controller/ContratoController';
import {
  createContratoValidator,
  updateContratoValidator,
  validate,
} from '../validator/contrato.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const contratoRouter = Router();

const contratoRepository = new DbContratoRepository();
const clienteRepository = new DbClienteRepository();
const clienteUseCase = new ClienteUseCase(clienteRepository);

const tipoContratoRepository = new DbTipoContratoRepository();
const tipoContratoUseCase = new TipoContratoUseCase(tipoContratoRepository);

const centroCustoRepository = new DbCentroCustoRepository();
const centroCustoUseCase = new CentroCustoUseCase(centroCustoRepository);

const contratoUseCase = new ContratoUseCase(contratoRepository);

const contratoController = new ContratoController(contratoUseCase, clienteUseCase, tipoContratoUseCase, centroCustoUseCase);

const authenticateController = new AuthController();

contratoRouter.post(
  '/', 
  authMiddleware, 
  createContratoValidator, 
  validate, 
  contratoController.insert
);

contratoRouter.get(
  '/', 
  authMiddleware, 
  contratoController.index
);

contratoRouter.get(
  '/:id', 
  authMiddleware, 
  contratoController.show
);

contratoRouter.put(
  '/:id',
  authMiddleware,
  updateContratoValidator,
  validate,
  contratoController.update
);

contratoRouter.delete(
  '/:id', 
  authMiddleware, 
  contratoController.delete
);
