import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export const createContratoValidator = [
  body('cliente_id')
    .isInt( {min: 1})
    .withMessage('Cliente é obrigatório'),
  body('tipo_contrato_id')
    .isInt( {min: 1})
    .withMessage('Tipo de contrato é obrigatório'),
  body('centro_custo_id')
    .isInt( {min: 1})
    .withMessage('Centro de custo é obrigatório'),
  body('numero')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Número é obrigatório'),
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatório'), 
  body('inicio_vigencia')
    .exists()
    .not()
    .isDate()
    .withMessage('Inicio de vigência é obrigatório'), 
  body('termino_vigencia')
    .exists()
    .not()
    .isDate()
    .withMessage('Término de vigência é obrigatório'),     
  body('termino_contrato')
    .exists()
    .not()
    .isDate()
    .withMessage('Término de contrato é obrigatório'),
  body('valor_mensal')
    .isInt()
    .withMessage('Valor mensal é obrigatório'),
  body('situacao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Situação é obrigatória'),
  body('situacao')
    .isString()
    .isIn(['A','I'])
    .withMessage('Situação inválida'),
];

export const updateContratoValidator = [
  body('cliente_id')
    .isInt( {min: 1})
    .withMessage('Cliente é obrigatório'),
  body('tipo_contrato_id')
    .isInt( {min: 1})
    .withMessage('Tipo de contrato é obrigatório'),
  body('centro_custo_id')
    .isInt( {min: 1})
    .withMessage('Centro de custo é obrigatório'),
  body('numero')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Número é obrigatório'),
  body('descricao')
    .isString()
    .isLength({ min: 1 })
    .withMessage('Descrição é obrigatório'), 
  body('inicio_vigencia')
    .exists()
    .not()
    .isDate()
    .withMessage('Inicio de vigência é obrigatório'), 
  body('termino_vigencia')
    .exists()
    .not()
    .isDate()
    .withMessage('Término de vigência é obrigatório'),     
  body('termino_contrato')
    .exists()
    .not()
    .isDate()
    .withMessage('Término de contrato é obrigatório'),     
  body('valor_mensal')
    .isInt()
    .withMessage('Valor mensal é obrigatório'),
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
