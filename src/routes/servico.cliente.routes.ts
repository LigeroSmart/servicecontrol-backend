import { Router } from 'express';
import { DbClienteRepository } from '../repository/DbClienteRepository';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { DbServicoRepository } from '../repository/DbServicoRepository';
import { ServicoUseCase } from '../use-cases/ServicoUseCase';
import { DbServicoClienteRepository } from '../repository/DbServicoClienteRepository';
import { ServicoClienteUseCase } from '../use-cases/ServicoClienteUseCase';
import { ServicoClienteController } from '../controller/ServicoClienteController';
import {
  createServicoClienteValidator,
  updateServicoClienteValidator,
  validate,
} from '../validator/servico.cliente.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const servicoClienteRouter = Router();

const clienteRepository = new DbClienteRepository();
const clienteUseCase = new ClienteUseCase(clienteRepository);
const servicoRepository = new DbServicoRepository();
const servicoUseCase = new ServicoUseCase(servicoRepository);
const servicoClienteRepository = new DbServicoClienteRepository();
const servicoClienteUseCase = new ServicoClienteUseCase(servicoClienteRepository);
const servicoClienteController = new ServicoClienteController(servicoClienteUseCase, clienteUseCase, servicoUseCase);

const authenticateController = new AuthController();

servicoClienteRouter.post(
  '/', 
  authMiddleware, 
  createServicoClienteValidator, 
  validate, 
  servicoClienteController.insert
);

servicoClienteRouter.get(
  '/', 
  authMiddleware, 
  servicoClienteController.index
);

servicoClienteRouter.get(
  '/servico', 
  authMiddleware, 
  servicoClienteController.showCliente
);

servicoClienteRouter.get(
  '/:id', 
  authMiddleware, 
  servicoClienteController.show
);

servicoClienteRouter.put(
  '/:id',
  authMiddleware,
  updateServicoClienteValidator,
  validate,
  servicoClienteController.update
);

servicoClienteRouter.delete(
  '/:id', 
  authMiddleware, 
  servicoClienteController.delete
);
