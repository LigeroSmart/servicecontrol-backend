import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createServicoClienteValidator = [
  body('servico_id')
    .isInt()
    .withMessage('Serviço é obrigatório'),
  body('cliente_id')
    .isInt()
    .withMessage('Cliente é obrigatório'),
];

export const updateServicoClienteValidator = [
  body('servico_id')
    .isInt()
    .withMessage('Serviço é obrigatório'),
  body('cliente_id')
    .isInt()
    .withMessage('Cliente é obrigatório'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
