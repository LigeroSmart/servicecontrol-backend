import { DbUsuarioRepository } from '../../repository/DbUsuarioRepository';
import { AuthUseCase } from '../AuthUseCase';

export function MakeAuthUseCase() {
  const usuarioRepository = new DbUsuarioRepository();
  const authUseCase = new AuthUseCase(usuarioRepository);
  return authUseCase;
}
