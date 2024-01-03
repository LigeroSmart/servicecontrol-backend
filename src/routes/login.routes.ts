import { Router } from 'express';
import { DbUsuarioRepository } from '../repository/DbUsuarioRepository';
import { UsuarioUseCase } from '../use-cases/UsuarioUseCase';
import { UsuarioController } from '../controller/UsuarioController';
import { AuthController } from '../controller/AuthController';

export const loginRouter = Router();

const userRepository = new DbUsuarioRepository();
const userUseCase = new UsuarioUseCase(userRepository);
const userController = new UsuarioController(userUseCase);
const authController = new AuthController();

loginRouter.post('/login', authController.authenticate);
