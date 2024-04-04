import { Router } from 'express';
import { DbTipoChamadoRepository } from '../repository/DbTipoChamadoRepository';
import { TipoChamadoUseCase } from '../use-cases/TipoChamadoUseCase';
import { TipoChamadoController } from '../controller/TipoChamadoController';
import {
  createTipoChamadoValidator,
  updateTipoChamadoValidator,
  validate,
} from '../validator/tipo.chamado.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const tipoChamadoRouter = Router();

const tipoChamadoRepository = new DbTipoChamadoRepository();
const tipoChamadoUseCase = new TipoChamadoUseCase(tipoChamadoRepository);
const tipoChamadoController = new TipoChamadoController(tipoChamadoUseCase);

const authenticateController = new AuthController();

tipoChamadoRouter.post(
  '/', 
  authMiddleware, 
  createTipoChamadoValidator, 
  validate, 
  tipoChamadoController.insert
);

tipoChamadoRouter.get(
  '/', 
  authMiddleware, 
  tipoChamadoController.index
);

tipoChamadoRouter.get(
  '/:id', 
  authMiddleware, 
  tipoChamadoController.show
);

tipoChamadoRouter.put(
  '/:id',
  authMiddleware,
  updateTipoChamadoValidator,
  validate,
  tipoChamadoController.update
);

tipoChamadoRouter.delete(
  '/:id', 
  authMiddleware, 
  tipoChamadoController.delete
);
