import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';
import { cnpj as validaCnpj } from 'cpf-cnpj-validator';

export const createClienteValidator = [
  body('codigo')
    .isInt( {min: 1})
    .withMessage('Código é obrigatório'),
  body('modelo_horario_id')
    .isInt( {min: 1})
    .withMessage('Modelo de horário é obrigatório'),    
  body('cnpj')
    .custom(value => {
      if (!value) {
        return Promise.reject('CNPJ obrigatório.');
      }
      if (!validaCnpj.isValid(value)) {
        return Promise.reject('CNPJ inválido');
      }
      return true
    }),
  body('abreviacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Abreviação é obrigatório'),    
  body('nome_fantasia')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Nome fantasia é obrigatório'),    
  body('razao_social')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Razão social é obrigatório'),
];

export const updateClienteValidator = [
  body('codigo')
    .isInt( {min: 1})
    .withMessage('Código é obrigatório'),
  body('modelo_horario_id')
    .isInt( {min: 1})
    .withMessage('Modelo de horário é obrigatório'),    
  body('cnpj')
    .custom(value => {
      if (!value) {
        return Promise.reject('CNPJ obrigatório.');
      }
      if (!validaCnpj.isValid(value)) {
        return Promise.reject('CNPJ inválido');
      }
      return true
    }),
  body('abreviacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Abreviação é obrigatório'),    
  body('nome_fantasia')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Nome fantasia é obrigatório'),    
  body('razao_social')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Razão social é obrigatório'),
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
