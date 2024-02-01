import { Router } from 'express';
import { DbTipoHorarioRepository } from '../repository/DbTipoHorarioRepository';
import { TipoHorarioUseCase } from '../use-cases/TipoHorarioUseCase';
import { TipoHorarioController } from '../controller/TipoHorarioController';
import {
  createTipoHorarioValidator,
  updateTipoHorarioValidator,
  validate,
} from '../validator/tipo.horario.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const tipoHorarioRouter = Router();

const tipoHorarioRepository = new DbTipoHorarioRepository();
const tipoHorarioUseCase = new TipoHorarioUseCase(tipoHorarioRepository);
const tipoHorarioController = new TipoHorarioController(tipoHorarioUseCase);

const authenticateController = new AuthController();

tipoHorarioRouter.post(
  '/', 
  authMiddleware, 
  createTipoHorarioValidator, 
  validate, 
  tipoHorarioController.insert
);

tipoHorarioRouter.get(
  '/', 
  authMiddleware, 
  tipoHorarioController.index
);

tipoHorarioRouter.get(
  '/:id', 
  authMiddleware, 
  tipoHorarioController.show
);

tipoHorarioRouter.put(
  '/:id',
  authMiddleware,
  updateTipoHorarioValidator,
  validate,
  tipoHorarioController.update
);

tipoHorarioRouter.delete(
  '/:id', 
  authMiddleware, 
  tipoHorarioController.delete
);
