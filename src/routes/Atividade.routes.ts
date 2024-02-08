import { Router } from 'express';
// import { DbModeloHorarioRepository } from '../repository/DbModeloHorarioRepository';
// import { ModeloHorarioUseCase } from '../use-cases/ModeloHorarioUseCase';
import { DbAtividadeRepository } from '../repository/DbAtividadeRepository';
import { AtividadeUseCase } from '../use-cases/AtividadeUseCase';
import { AtividadeController } from '../controller/AtividadeController';
import { DbUsuarioRepository } from '../repository/DbUsuarioRepository';
import { UsuarioUseCase } from '../use-cases/UsuarioUseCase';
import { DbTipoHorarioRepository } from '../repository/DbTipoHorarioRepository';
import { TipoHorarioUseCase } from '../use-cases/TipoHorarioUseCase';
import { DbTipoAtividadeRepository } from '../repository/DbTipoAtividadeRepository';
import { TipoAtividadeUseCase } from '../use-cases/TipoAtividadeUseCase';
import {
  createAtividadeValidator,
  updateAtividadeValidator,
  validate,
} from '../validator/atividade.validator';
import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const atividadeRouter = Router();

const atividadeRepository = new DbAtividadeRepository();
const atividadeUseCase = new AtividadeUseCase(atividadeRepository);

const usuarioRepository = new DbUsuarioRepository();
const usuarioUseCase = new UsuarioUseCase(usuarioRepository);

const tipoHorarioRepository = new DbTipoHorarioRepository();
const tipoHorarioUseCase = new TipoHorarioUseCase(tipoHorarioRepository);

const tipoAtividadeRepository = new DbTipoAtividadeRepository();
const tipoAtividadeUseCase = new TipoAtividadeUseCase(tipoAtividadeRepository);

// const modeloHorarioRepository = new DbModeloHorarioRepository();
// const modeloHorarioUseCase = new ModeloHorarioUseCase(modeloHorarioRepository);

const atividadeController = new AtividadeController(
  atividadeUseCase, 
  usuarioUseCase,
  tipoHorarioUseCase,
  tipoAtividadeUseCase
);

const authenticateController = new AuthController();

atividadeRouter.post(
  '/', 
  authMiddleware, 
  createAtividadeValidator, 
  validate, 
  atividadeController.insert
);

atividadeRouter.get(
  '/', 
  authMiddleware, 
  atividadeController.index
);

atividadeRouter.get(
  '/:id', 
  authMiddleware, 
  atividadeController.show
);

atividadeRouter.put(
  '/:id',
  authMiddleware,
  updateAtividadeValidator,
  validate,
  atividadeController.update
);

atividadeRouter.delete(
  '/:id', 
  authMiddleware, 
  atividadeController.delete
);
