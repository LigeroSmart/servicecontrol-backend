import { Router } from 'express';
import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
import { DbClienteRepository } from '../repository/DbClienteRepository';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { ModeloHorarioUseCase } from '../use-cases/ModeloHorarioUseCase';
import { ClienteController } from '../controller/ClienteController';
import {
  createClienteValidator,
  updateClienteValidator,
  validate,
} from '../validator/cliente.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const clienteRouter = Router();

const clienteRepository = new DbClienteRepository();
const modeloHorarioRepository = new DbModeloHorarioRepository();
const clienteUseCase = new ClienteUseCase(clienteRepository);
const modeloHorarioUseCase = new ModeloHorarioUseCase(modeloHorarioRepository);
const clienteController = new ClienteController(clienteUseCase, modeloHorarioUseCase);

const authenticateController = new AuthController();

clienteRouter.post(
  '/', 
  authMiddleware, 
  createClienteValidator, 
  validate, 
  clienteController.insert
);

clienteRouter.get(
  '/', 
  authMiddleware, 
  clienteController.index
);

clienteRouter.get(
  '/:id', 
  authMiddleware, 
  clienteController.show
);

clienteRouter.put(
  '/:id',
  authMiddleware,
  updateClienteValidator,
  validate,
  clienteController.update
);

clienteRouter.delete(
  '/:id', 
  authMiddleware, 
  clienteController.delete
);
