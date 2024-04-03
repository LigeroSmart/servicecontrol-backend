import { Router } from 'express';
import { DbContratoRegraCobrancaRepository } from '../repository/DbContratoRegraCobrancaRepository';
import { DbRegraCobrancaTipoHorarioRepository } from '../repository/DbRegraCobrancaTipoHorarioRepository';
import { DbRegraCobrancaServicoRepository } from '../repository/DbRegraCobrancaServicoRepository';
import { DbRegraCobrancaTipoAtividadeRepository } from '../repository/DbRegraCobrancaTipoAtividadeRepository';
import { DbRegraCobrancaTipoChamadoRepository } from '../repository/DbRegraCobrancaTipoChamadoRepository';
import { ContratoRegraCobrancaUseCase } from '../use-cases/ContratoRegraCobrancaUseCase';
import { ContratoRegraCobrancaController } from '../controller/ContratoRegraCobrancaController';

import {
  createContratoRegraCobrancaValidator,
  updateContratoRegraCobrancaValidator,
  validate,
} from '../validator/contrato.regra.cobranca.validator';

import { authMiddleware } from '../middleware/auth';
import { AuthController } from '../controller/AuthController';

export const contratoRegraCobrancaRouter = Router();

const contratoRegraCobrancaRepository = new DbContratoRegraCobrancaRepository();
const regraCobrancaTipoHorarioRepository = new DbRegraCobrancaTipoHorarioRepository();
const regraCobrancaTipoAtividadeRepository = new DbRegraCobrancaTipoAtividadeRepository();
const regraCobrancaTipoChamadoRepository = new DbRegraCobrancaTipoChamadoRepository();
const regraCobrancaServicoRepository = new DbRegraCobrancaServicoRepository();

const contratoRegraCobrancaUseCase = new ContratoRegraCobrancaUseCase(
  contratoRegraCobrancaRepository, 
  regraCobrancaTipoHorarioRepository,
  regraCobrancaServicoRepository,
  regraCobrancaTipoAtividadeRepository,
  regraCobrancaTipoChamadoRepository
);

const contratoRegraCobrancaController = new ContratoRegraCobrancaController(contratoRegraCobrancaUseCase);

const authenticateController = new AuthController();

contratoRegraCobrancaRouter.post(
  '/', 
  createContratoRegraCobrancaValidator, 
  validate, 
  contratoRegraCobrancaController.insert
);

contratoRegraCobrancaRouter.get(
  '/', 
  authMiddleware, 
  contratoRegraCobrancaController.index
);

// contratoRegraCobrancaRouter.get(
//   '/menu', 
//   authMiddleware, 
//   contratoRegraCobrancaController.showContratoRegraCobranca
// );

contratoRegraCobrancaRouter.get(
  '/:id', 
  authMiddleware, 
  contratoRegraCobrancaController.show
);



contratoRegraCobrancaRouter.put(
  '/:id',
  authMiddleware,
  updateContratoRegraCobrancaValidator,
  validate,
  contratoRegraCobrancaController.update
);


contratoRegraCobrancaRouter.delete(
  '/:id', 
  authMiddleware, 
  contratoRegraCobrancaController.delete
);
