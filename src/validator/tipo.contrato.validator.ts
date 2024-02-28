import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createTipoContratoValidator = [
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('cobranca_unica')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Cobrança única é obrigatória'),
  body('cobranca_unica')
    .isString()
    .isIn(['S','N'])
    .withMessage('Cobrança única inválida'), 
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
  body('situacao')
    .isString()
    .isIn(['A','I'])
    .withMessage('Situação inválida'),    
];

export const updateTipoContratoValidator = [
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('cobranca_unica')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Cobrança única é obrigatória'),
  body('cobranca_unica')
    .isString()
    .isIn(['S','N'])
    .withMessage('Cobrança única inválida'),     
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
  body('situacao')
    .isString()
    .isIn(['A','I'])
    .withMessage('Situação inválida'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};