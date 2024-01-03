import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createUsuarioValidator = [
  body('nome')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome precisa conter no mínimo 3 caracteres'),
  body('usuario')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O usuario precisa conter um mínimo 3 caracteres'),
  body('senha')
    .isLength({ min: 6 })
    .withMessage('A senha precisa conter no mínimo 6 caracteres')
    .isLength({ max: 12 })
    .withMessage('A senha precisa conter um maximo de 12 caracteres')
    .matches(/^(.*[A-Z].*)$/)
    .withMessage('A senha precisa conter uma letra maiúscula'),
  body('senha')
    .matches(/(?=.*\d)/)
    .withMessage('A senha precisa conter pelo menos um numero'),
];

export const updateUsuarioValidator = [
  body('nome')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O nome precisa conter no mínimo 3 caracteres')
    .optional(),
  body('usuario')
    .isString()
    .isLength({ min: 3 })
    .withMessage('O usuario precisa conter um mínimo 3 caracteres')
    .optional(),    
  body('senha')
    .isLength({ min: 6 })
    .withMessage('A senha precisa conter no mínimo 6 caracteres')
    .isLength({ max: 12 })
    .withMessage('A senha precisa conter um maximo de 12 caracteres')
    .matches(/^(.*[A-Z].*)$/)
    .withMessage('A senha precisa conter uma letra maiúscula')
    .optional(),
  body('senha')
    .matches(/(?=.*\d)/)
    .withMessage('A senha precisa conter pelo menos um numero')
    .optional(),
];

export const updateUsuarioPasswordValidator = [
  body('senha')
    .isLength({ min: 6 })
    .withMessage('A senha precisa conter no mínimo 6 caracteres')
    .isLength({ max: 10 })
    .withMessage('A senha precisa conter um maximo de 12 caracteres')
    .matches(/^(.*[A-Z].*)$/)
    .withMessage('A senha precisa conter uma letra maiúscula')
    .optional(),
  body('senha')
    .matches(/(?=.*\d)/)
    .withMessage('A senha precisa conter pelo menos um numero')
    .optional(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
