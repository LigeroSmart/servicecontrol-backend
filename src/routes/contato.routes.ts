import { Router } from 'express';
import { DbClienteRepository } from '../repository/DbClienteRepository';
import { DbContatoRepository } from '../repository/DbContatoRepository';
import { ContatoUseCase } from '../use-cases/ContatoUseCase';
import { ClienteUseCase } from '../use-cases/ClienteUseCase';
import { ContatoController } from '../controller/ContatoController';
import {
  createContatoValidator,
  updateContatoValidator,
  validate,
} from '../validator/contato.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const contatoRouter = Router();

const contatoRepository = new DbContatoRepository();
const clienteRepository = new DbClienteRepository();
const contatoUseCase = new ContatoUseCase(contatoRepository);
const clienteUseCase = new ClienteUseCase(clienteRepository);
const contatoController = new ContatoController(contatoUseCase, clienteUseCase);

const authenticateController = new AuthController();

contatoRouter.post(
  '/', 
  authMiddleware, 
  createContatoValidator, 
  validate, 
  contatoController.insert
);

contatoRouter.get(
  '/', 
  authMiddleware, 
  contatoController.index
);

contatoRouter.get(
  '/:id', 
  authMiddleware, 
  contatoController.show
);

contatoRouter.put(
  '/:id',
  authMiddleware,
  updateContatoValidator,
  validate,
  contatoController.update
);

contatoRouter.delete(
  '/:id', 
  authMiddleware, 
  contatoController.delete
);
