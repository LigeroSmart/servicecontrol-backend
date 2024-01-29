import { Router } from 'express';
import { DbMenuRepository } from '../repository/DbMenuRepository';
import { MenuUseCase } from '../use-cases/MenuUseCase';
import { MenuController } from '../controller/MenuController';
import {
  createMenuValidator,
  updateMenuValidator,
  validate,
} from '../validator/menu.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const menuRouter = Router();

const menuRepository = new DbMenuRepository();
const menuUseCase = new MenuUseCase(menuRepository);
const menuController = new MenuController(menuUseCase);

const authenticateController = new AuthController();

menuRouter.post(
  '/', 
  authMiddleware, 
  createMenuValidator, 
  validate, 
  menuController.insert
);

menuRouter.get(
  '/', 
  authMiddleware, 
  menuController.index
);

menuRouter.get(
  '/:id', 
  authMiddleware, 
  menuController.show
);

menuRouter.put(
  '/:id',
  authMiddleware,
  updateMenuValidator,
  validate,
  menuController.update
);

menuRouter.delete(
  '/:id', 
  authMiddleware, 
  menuController.delete
);
