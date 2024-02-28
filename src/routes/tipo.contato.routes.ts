import { Router } from 'express';
import { DbTipoContatoRepository } from '../repository/DbTipoContatoRepository';
import { TipoContatoUseCase } from '../use-cases/TipoContatoUseCase';
import { TipoContatoController } from '../controller/TipoContatoController';
import {
  createTipoContatoValidator,
  updateTipoContatoValidator,
  validate,
} from '../validator/tipo.contato.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const tipoContatoRouter = Router();

const tipoContatoRepository = new DbTipoContatoRepository();
const tipoContatoUseCase = new TipoContatoUseCase(tipoContatoRepository);
const tipoContatoController = new TipoContatoController(tipoContatoUseCase);

const authenticateController = new AuthController();

tipoContatoRouter.post(
  '/', 
  authMiddleware, 
  createTipoContatoValidator, 
  validate, 
  tipoContatoController.insert
);

tipoContatoRouter.get(
  '/', 
  authMiddleware, 
  tipoContatoController.index
);

tipoContatoRouter.get(
  '/:id', 
  authMiddleware, 
  tipoContatoController.show
);

tipoContatoRouter.put(
  '/:id',
  authMiddleware,
  updateTipoContatoValidator,
  validate,
  tipoContatoController.update
);

tipoContatoRouter.delete(
  '/:id', 
  authMiddleware, 
  tipoContatoController.delete
);
