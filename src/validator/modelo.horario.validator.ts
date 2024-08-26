import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createModeloHorarioValidator = [
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('tipo_horario_id')
    .isInt( {min: 1})
    .withMessage('Tipo de horário é obrigatória'),
  body('inicio')
    .isString()
    .isLength( {min: 5} )
    .withMessage('Inicio é obrigatório'),    
  body('termino')
    .isString()
    .isLength( {min: 5} )
    .withMessage('Término é obrigatório'),        
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
  body('situacao')
    .isString()
    .isIn(['A','I'])
    .withMessage('Situação inválida'),
];

export const updateModeloHorarioValidator = [
  body('descricao')    
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('tipo_horario_id')
    .isInt( {min: 1})
    .withMessage('Tipo de horário é obrigatória'),
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
