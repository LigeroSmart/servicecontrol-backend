import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createContratoRegraSlaValidator = [
  body('contrato_id')
    .isInt( {min: 1})
    .withMessage('Contrato é obrigatório'),    
];

export const updateContratoRegraSlaValidator = [
  body('contrato_id')
    .isInt( {min: 1})
    .withMessage('Contrato é obrigatório'),    
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
