import { Router } from 'express';
import { DbUsuarioRepository } from '../repository/DbUsuarioRepository';
import { UsuarioUseCase } from '../use-cases/UsuarioUseCase';
import { UsuarioController } from '../controller/UsuarioController';
import {
  createUsuarioValidator,
  updateUsuarioPasswordValidator,
  updateUsuarioValidator,
  validate,
} from '../validator/usuario.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const usuarioRouter = Router();

const userRepository = new DbUsuarioRepository();
const userUseCase = new UsuarioUseCase(userRepository);
const userController = new UsuarioController(userUseCase);

const authenticateController = new AuthController();

usuarioRouter.post('/', createUsuarioValidator, validate, userController.insert);

usuarioRouter.put('/:id/validation', userController.validationUser);

usuarioRouter.get('/', authMiddleware, userController.index);

usuarioRouter.get('/:id', authMiddleware, userController.show);

usuarioRouter.put(
  '/:id',
  authMiddleware,
  updateUsuarioValidator,
  validate,
  userController.update
);

usuarioRouter.put(
  '/:id/password',
  authMiddleware,
  updateUsuarioPasswordValidator,
  validate,
  userController.updatePassword
);

usuarioRouter.delete('/:id', authMiddleware, userController.delete);
