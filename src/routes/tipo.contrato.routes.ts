import { Router } from 'express';
import { DbTipoContratoRepository } from '../repository/DbTipoContratoRepository';
import { TipoContratoUseCase } from '../use-cases/TipoContratoUseCase';
import { TipoContratoController } from '../controller/TipoContratoController';
import {
  createTipoContratoValidator,
  updateTipoContratoValidator,
  validate,
} from '../validator/tipo.contrato.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const tipoContratoRouter = Router();

const tipoContratoRepository = new DbTipoContratoRepository();
const tipoContratoUseCase = new TipoContratoUseCase(tipoContratoRepository);
const tipoContratoController = new TipoContratoController(tipoContratoUseCase);

const authenticateController = new AuthController();

tipoContratoRouter.post(
  '/', 
  authMiddleware, 
  createTipoContratoValidator, 
  validate, 
  tipoContratoController.insert
);

tipoContratoRouter.get(
  '/', 
  authMiddleware, 
  tipoContratoController.index
);

tipoContratoRouter.get(
  '/:id', 
  authMiddleware, 
  tipoContratoController.show
);

tipoContratoRouter.put(
  '/:id',
  authMiddleware,
  updateTipoContratoValidator,
  validate,
  tipoContratoController.update
);

tipoContratoRouter.delete(
  '/:id', 
  authMiddleware, 
  tipoContratoController.delete
);
