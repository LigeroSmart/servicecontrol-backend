import { Router } from 'express';
import { DbTipoAtividadeRepository } from '../repository/DbTipoAtividadeRepository';
import { TipoAtividadeUseCase } from '../use-cases/TipoAtividadeUseCase';
import { TipoAtividadeController } from '../controller/TipoAtividadeController';
import {
  createTipoAtividadeValidator,
  updateTipoAtividadeValidator,
  validate,
} from '../validator/tipo.atividade.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const tipoAtividadeRouter = Router();

const tipoAtividadeRepository = new DbTipoAtividadeRepository();
const tipoAtividadeUseCase = new TipoAtividadeUseCase(tipoAtividadeRepository);
const tipoAtividadeController = new TipoAtividadeController(tipoAtividadeUseCase);

const authenticateController = new AuthController();

tipoAtividadeRouter.post(
  '/', 
  authMiddleware, 
  createTipoAtividadeValidator, 
  validate, 
  tipoAtividadeController.insert
);

tipoAtividadeRouter.get(
  '/', 
  authMiddleware, 
  tipoAtividadeController.index
);

tipoAtividadeRouter.get(
  '/:id', 
  authMiddleware, 
  tipoAtividadeController.show
);

tipoAtividadeRouter.put(
  '/:id',
  authMiddleware,
  updateTipoAtividadeValidator,
  validate,
  tipoAtividadeController.update
);

tipoAtividadeRouter.delete(
  '/:id', 
  authMiddleware, 
  tipoAtividadeController.delete
);
