import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createUsuarioValidator = [
  body('email')
    .isString()
    .isLength({ min: 10 })
    .withMessage('E-mail é obrigatório'),
  body('nome')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Nome é obrigatório'),  
  body('perfil_id')
    .isInt()
    .withMessage('Perfil de acesso é obrigatório'),
  body('administrador')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Administrador é obrigatório')
    .isString()
    .isIn(['S','N'])
    .withMessage('Administrador inválido'),
];

export const updateUsuarioValidator = [
  body('nome')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Nome é obrigatório'),  
  body('perfil_id')
    .isInt()
    .withMessage('Perfil de acesso é obrigatório'),
  body('administrador')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Administrador é obrigatório'),
  body('administrador')
    .isString()
    .isIn(['S','N'])
    .withMessage('Administrador inválido'),
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
  body('situacao')
    .isString()
    .isIn(['A','I'])
    .withMessage('Situação inválida'),
];

export const updateUsuarioPasswordValidator = [
  body('senha')
    .isLength({ min: 6 })
    .withMessage('A senha precisa conter no mínimo 6 caracteres')
    .isLength({ max: 10 })
    .withMessage('A senha precisa conter um maximo de 10 caracteres')
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
