import { Router } from 'express';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { ModeloHorarioUseCase } from '../use-cases/ModeloHorarioUseCase';
import { ModeloHorarioController } from '../controller/ModeloHorarioController';
import {
  createModeloHorarioValidator,
  updateModeloHorarioValidator,
  validate,
} from '../validator/modelo.horario.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const modeloHorarioRouter = Router();

const modeloHorarioRepository = new DbModeloHorarioRepository();
const modeloHorarioUseCase = new ModeloHorarioUseCase(modeloHorarioRepository);
const modeloHorarioController = new ModeloHorarioController(modeloHorarioUseCase);

const authenticateController = new AuthController();

modeloHorarioRouter.post(
  '/', 
  authMiddleware, 
  createModeloHorarioValidator, 
  validate, 
  modeloHorarioController.insert
);

modeloHorarioRouter.get(
  '/', 
  authMiddleware, 
  modeloHorarioController.index
);

modeloHorarioRouter.get(
  '/:id', 
  authMiddleware, 
  modeloHorarioController.show
);

modeloHorarioRouter.put(
  '/:id',
  authMiddleware,
  updateModeloHorarioValidator,
  validate,
  modeloHorarioController.update
);

modeloHorarioRouter.delete(
  '/:id', 
  authMiddleware, 
  modeloHorarioController.delete
);
