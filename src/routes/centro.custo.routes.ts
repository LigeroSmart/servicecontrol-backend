import { Router } from 'express';
import { DbCentroCustoRepository } from '../repository/DbCentroCustoRepository';
import { CentroCustoUseCase } from '../use-cases/CentroCustoUseCase';
import { CentroCustoController } from '../controller/CentroCustoController';
import {
  createCentroCustoValidator,
  updateCentroCustoValidator,
  validate,
} from '../validator/centro.custo.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const centroCustoRouter = Router();

const centroCustoRepository = new DbCentroCustoRepository();
const centroCustoUseCase = new CentroCustoUseCase(centroCustoRepository);
const centroCustoController = new CentroCustoController(centroCustoUseCase);

const authenticateController = new AuthController();

centroCustoRouter.post(
  '/', 
  authMiddleware, 
  createCentroCustoValidator, 
  validate, 
  centroCustoController.insert
);

centroCustoRouter.get(
  '/', 
  authMiddleware, 
  centroCustoController.index
);

centroCustoRouter.get(
  '/:id', 
  authMiddleware, 
  centroCustoController.show
);

centroCustoRouter.put(
  '/:id',
  authMiddleware,
  updateCentroCustoValidator,
  validate,
  centroCustoController.update
);

centroCustoRouter.delete(
  '/:id', 
  authMiddleware, 
  centroCustoController.delete
);
