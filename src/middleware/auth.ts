import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { AcessInvalid } from '../errors/AcessInvalid';
import { Usuario } from '../entities/Usuario';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //check if token is valid
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   
    // check if header has a token
    if (!token) throw new AcessInvalid();

    const secretKey = process.env.JWT_SECRET_KEY; // Acessando a variável de ambiente

    const verified = await JWT.verify(token, process.env.JWT_SECRET || '');

    req.user = verified as User;

    next();
  } catch (error: any) {
    if (error instanceof AcessInvalid) {
      res.status(401).json({ error: error.message });
    } else {
      return res.status(401).json({ error: 'Token de autenticação inválido.' });
    }
  }
}
