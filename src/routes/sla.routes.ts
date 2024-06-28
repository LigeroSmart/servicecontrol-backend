import { Router } from 'express';
import { DbSlaRepository } from '../repository/DbSlaRepository';
import { SlaUseCase } from '../use-cases/SlaUseCase';
import { SlaController } from '../controller/SlaController';
import {
  createSlaValidator,
  updateSlaValidator,
  validate,
} from '../validator/sla.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const slaRouter = Router();

const slaRepository = new DbSlaRepository();
const slaUseCase = new SlaUseCase(slaRepository);
const slaController = new SlaController(slaUseCase);

const authenticateController = new AuthController();

slaRouter.post(
  '/', 
  authMiddleware, 
  createSlaValidator, 
  validate, 
  slaController.insert
);

slaRouter.get(
  '/', 
  authMiddleware, 
  slaController.index
);

slaRouter.get(
  '/:id', 
  authMiddleware, 
  slaController.show
);

slaRouter.put(
  '/:id',
  authMiddleware,
  updateSlaValidator,
  validate,
  slaController.update
);

slaRouter.delete(
  '/:id', 
  authMiddleware, 
  slaController.delete
);
