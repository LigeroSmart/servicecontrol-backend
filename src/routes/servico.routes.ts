import { Router } from 'express';
import { DbServicoRepository } from '../repository/DbServicoRepository';
import { ServicoUseCase } from '../use-cases/ServicoUseCase';
import { ServicoController } from '../controller/ServicoController';
import {
  createServicoValidator,
  updateServicoValidator,
  validate,
} from '../validator/servico.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const servicoRouter = Router();

const servicoRepository = new DbServicoRepository();
const servicoUseCase = new ServicoUseCase(servicoRepository);
const servicoController = new ServicoController(servicoUseCase);

const authenticateController = new AuthController();

servicoRouter.post(
  '/', 
  authMiddleware, 
  createServicoValidator, 
  validate, 
  servicoController.insert
);

servicoRouter.get(
  '/', 
  authMiddleware, 
  servicoController.index
);

servicoRouter.get(
  '/:id', 
  authMiddleware, 
  servicoController.show
);

servicoRouter.put(
  '/:id',
  authMiddleware,
  updateServicoValidator,
  validate,
  servicoController.update
);

servicoRouter.delete(
  '/:id', 
  authMiddleware, 
  servicoController.delete
);
