import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createContratoRegraFranquiaValidator = [
  body('contrato_id')
    .isInt( {min: 1})
    .withMessage('Contrato é obrigatório'),    
  body('qtd_horas')
    .isInt()
    .withMessage('Quantidade de horas é obrigatório'),
  body('valor_hora')
    .isInt()
    .withMessage('Valor hora é obrigatório'), 
  body('franquia_fixa')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Franquia fixa é obrigatória')
    .isIn(['S','N'])
    .withMessage('Franquia fixa inválida'),    
];

export const updateContratoRegraFranquiaValidator = [
  body('contrato_id')
    .isInt( {min: 1})
    .withMessage('Contrato é obrigatório'),    
  body('qtd_horas')
    .isInt()
    .withMessage('Quantidade de horas é obrigatório'),
  body('valor_hora')
    .isInt()
    .withMessage('Valor hora é obrigatório'), 
  body('franquia_fixa')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Franquia fixa é obrigatória')
    .isIn(['S','N'])
    .withMessage('Franquia fixa inválida'),    
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
