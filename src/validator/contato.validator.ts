import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createContatoValidator = [
  body('codigo')
    .isInt( {min: 1})
    .withMessage('Código é obrigatório'),
  body('cliente_id')
    .isInt( {min: 1})
    .withMessage('Cliente é obrigatório'),    
  body('nome')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Nome é obrigatório'),
  body('telefone')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Telefone é obrigatório'), 
  body('email')
    .isString()
    .isLength({ min: 1 })
    .withMessage('E-mail é obrigatório'), 
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
  body('situacao')
    .isString()
    .isIn(['A','I'])
    .withMessage('Situação inválida'),    
];

export const updateContatoValidator = [
  body('codigo')
    .isInt( {min: 1})
    .withMessage('Código é obrigatório'),
  body('cliente_id')
    .isInt( {min: 1})
    .withMessage('Cliente é obrigatório'),    
  body('nome')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Nome é obrigatório'),
  body('telefone')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Telefone é obrigatório'), 
  body('email')
    .isString()
    .isLength({ min: 1 })    
    .withMessage('E-mail é obrigatório'),    
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
