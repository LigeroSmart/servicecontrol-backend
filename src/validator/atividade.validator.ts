import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createAtividadeValidator = [
  body('ticket')
    .isInt( {min: 1})
    .withMessage('Ticket é obrigatório'),
  body('tipo_atividade_id')
    .isInt( {min: 1})
    .withMessage('Tipo de atividade é obrigatório'),
  body('data_inicio')
    .exists()
    .not()
    .isDate()
    .withMessage('Data de inicio é obrigatória'),
  body('data_final')
    .exists()
    .not()
    .isDate()
    .withMessage('Data final é obrigatória'),
  body('assunto')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Assunto é obrigatório'),
];

export const updateAtividadeValidator = [
  body('ticket')
    .isInt( {min: 1})
    .withMessage('Ticket é obrigatório'),
  body('tipo_atividade_id')
    .isInt( {min: 1})
    .withMessage('Tipo de atividade é obrigatório'),
  body('data_inicio')
    .exists()
    .not()
    .isDate()
    .withMessage('Data de inicio é obrigatória'),
  body('data_final')
    .exists()
    .not()
    .isDate()
    .withMessage('Data final é obrigatória'),
  body('assunto')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Assunto é obrigatório'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
