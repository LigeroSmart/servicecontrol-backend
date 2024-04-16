import { Router } from 'express';
import { DbContratoRegraFranquiaRepository } from '../repository/DbContratoRegraFranquiaRepository';
// import { DbRegraFranquiaTipoHorarioRepository } from '../repository/DbRegraFranquiaTipoHorarioRepository';
// import { DbRegraFranquiaServicoRepository } from '../repository/DbRegraFranquiaServicoRepository';
// import { DbRegraFranquiaTipoAtividadeRepository } from '../repository/DbRegraFranquiaTipoAtividadeRepository';
// import { DbRegraFranquiaTipoChamadoRepository } from '../repository/DbRegraFranquiaTipoChamadoRepository';
import { ContratoRegraFranquiaUseCase } from '../use-cases/ContratoRegraFranquiaUseCase';
import { ContratoRegraFranquiaController } from '../controller/ContratoRegraFranquiaController';

import {
  createContratoRegraFranquiaValidator,
  updateContratoRegraFranquiaValidator,
  validate,
} from '../validator/contrato.regra.franquia.validator';

import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const contratoRegraFranquiaRouter = Router();

const contratoRegraFranquiaRepository = new DbContratoRegraFranquiaRepository();
// const regraFranquiaTipoHorarioRepository = new DbRegraFranquiaTipoHorarioRepository();
// const regraFranquiaTipoAtividadeRepository = new DbRegraFranquiaTipoAtividadeRepository();
// const regraFranquiaTipoChamadoRepository = new DbRegraFranquiaTipoChamadoRepository();
// const regraFranquiaServicoRepository = new DbRegraFranquiaServicoRepository();

const contratoRegraFranquiaUseCase = new ContratoRegraFranquiaUseCase(
  contratoRegraFranquiaRepository
//   regraFranquiaTipoHorarioRepository,
//   regraFranquiaServicoRepository,
//   regraFranquiaTipoAtividadeRepository,
//   regraFranquiaTipoChamadoRepository
);

const contratoRegraFranquiaController = new ContratoRegraFranquiaController(contratoRegraFranquiaUseCase);

const authenticateController = new AuthController();

contratoRegraFranquiaRouter.post(
  '/', 
  createContratoRegraFranquiaValidator, 
  validate, 
  contratoRegraFranquiaController.insert
);

contratoRegraFranquiaRouter.get(
  '/', 
  authMiddleware, 
  contratoRegraFranquiaController.index
);

contratoRegraFranquiaRouter.get(
  '/:id', 
  authMiddleware, 
  contratoRegraFranquiaController.show
);

contratoRegraFranquiaRouter.put(
  '/:id',
  authMiddleware,
  updateContratoRegraFranquiaValidator,
  validate,
  contratoRegraFranquiaController.update
);

contratoRegraFranquiaRouter.delete(
  '/:id', 
  authMiddleware, 
  contratoRegraFranquiaController.delete
);
