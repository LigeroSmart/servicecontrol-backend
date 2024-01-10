import { Router } from 'express';
import { DbPerfilRepository } from '../repository/DbPerfilRepository';
import { DbPerfilMenuRepository } from '../repository/DbPerfilMenuRepository';
import { PerfilUseCase } from '../use-cases/PerfilUseCase';
import { PerfilController } from '../controller/PerfilController';
import {
  createPerfilValidator,
  updatePerfilValidator,
  validate,
} from '../validator/perfil.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const perfilRouter = Router();

const perfilRepository = new DbPerfilRepository();
const perfilMenuRepository = new DbPerfilMenuRepository();
const perfilUseCase = new PerfilUseCase(perfilRepository, perfilMenuRepository);
const perfilController = new PerfilController(perfilUseCase);

const authenticateController = new AuthController();

perfilRouter.post('/', createPerfilValidator, validate, perfilController.insert);

perfilRouter.get('/', authMiddleware, perfilController.index);

perfilRouter.get('/:id', authMiddleware, perfilController.show);

perfilRouter.put(
  '/:id',
  authMiddleware,
  updatePerfilValidator,
  validate,
  perfilController.update
);

perfilRouter.delete('/:id', authMiddleware, perfilController.delete);
