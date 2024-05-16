import { Router } from 'express';
import { DbContratoRegraSLARepository } from '../repository/DbContratoRegraSLARepository';
import { ContratoRegraSlaUseCase } from '../use-cases/ContratoRegraSLAUseCase';
import { ContratoRegraSlaController } from '../controller/ContratoRegraSLAController';

import {
  createContratoRegraSlaValidator,
  updateContratoRegraSlaValidator,
  validate,
} from '../validator/contrato.regra.sla.validator';

import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const contratoRegraSlaRouter = Router();

const contratoRegraSlaRepository = new DbContratoRegraSLARepository();

const contratoRegraSlaUseCase = new ContratoRegraSlaUseCase(
  contratoRegraSlaRepository
);

const contratoRegraSlaController = new ContratoRegraSlaController(contratoRegraSlaUseCase);

const authenticateController = new AuthController();

contratoRegraSlaRouter.post(
  '/', 
  createContratoRegraSlaValidator, 
  validate, 
  contratoRegraSlaController.insert
);

contratoRegraSlaRouter.get(
  '/', 
  authMiddleware, 
  contratoRegraSlaController.index
);

contratoRegraSlaRouter.get(
  '/:id', 
  authMiddleware, 
  contratoRegraSlaController.show
);

contratoRegraSlaRouter.put(
  '/:id',
  authMiddleware,
  updateContratoRegraSlaValidator,
  validate,
  contratoRegraSlaController.update
);

contratoRegraSlaRouter.delete(
  '/:id', 
  authMiddleware, 
  contratoRegraSlaController.delete
);
