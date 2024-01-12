import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createMenuValidator = [
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
];

export const updateMenuValidator = [
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('rota')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Rota é obrigatória'),    
  body('ativo')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Ativo é obrigatório'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
