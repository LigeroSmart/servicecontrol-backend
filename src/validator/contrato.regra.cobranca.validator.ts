import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createContratoRegraCobrancaValidator = [
  body('contrato_id')
    .isInt( {min: 1})
    .withMessage('Contrato é obrigatório'),    
  body('nome')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Nome é obrigatório'),
  body('valor')
    .isInt()
    .withMessage('Valor é obrigatório'), 
  body('bloqueado')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Bloqueado é obrigatório'),
  body('bloqueado')
    .isString()
    .isIn(['S','N'])
    .withMessage('Bloqueado inválido'),
];

export const updateContratoRegraCobrancaValidator = [
  body('contrato_id')
    .isInt( {min: 1})
    .withMessage('Contrato é obrigatório'),    
  body('nome')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Nome é obrigatório'),
  body('valor')
    .isInt()
    .withMessage('Valor é obrigatório'), 
  body('bloqueado')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Bloqueado é obrigatório'),
  body('bloqueado')
    .isString()
    .isIn(['S','N'])
    .withMessage('Bloqueado inválido'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
