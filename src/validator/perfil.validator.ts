import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createPerfilValidator = [
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
];

export const updatePerfilValidator = [
    body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatória'),
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
