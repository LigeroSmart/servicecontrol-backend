import { genSalt, hash } from 'bcryptjs';
import { UsuarioAlreadyExists } from '../errors/UsuarioAlreadyExists';
import { UsuarioNotFound } from '../errors/UsuarioNotFound';
import { CreateUsuarioDTO, IUsuario, UpdateUsuarioDTO } from '../interfaces/Usuario.Interface';
// import { sendEmail } from '../middlewares/sendEmail';
import { criptografar, descriptografar } from '../middleware/cripto';
import { DbUsuarioRepository } from '../repository/DbUsuarioRepository';
import { Console } from 'console';

const SALT_RANDOMS = 8;

const hasPassword = async (senha: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);
  return await hash(senha, saltGenerated);
}

export class UsuarioUseCase {
  constructor(private usuarioRepository: DbUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  public async createUsuario(
    usuario: string,
    data: CreateUsuarioDTO
  ): Promise<IUsuario | null> {
    const existsUserByUser = await this.usuarioRepository.getByUsuario(
      usuario
    );

    if (existsUserByUser) {
      throw new UsuarioAlreadyExists();
    }

    const passwordHash = await hasPassword(data.senha);

    data.situacao = 'I';

    const user = await this.usuarioRepository.createUsuario({
      perfil_id: data.perfil_id,
      nome: data.nome,
      email: data.email,
      senha: passwordHash,
      administrador: data.administrador,
      situacao: data.situacao,
    });

    // try {
    //   await sendEmail(email, user.nome);
    // } catch (error: any) {
    //   console.error('Erro ao enviar o email:', error.message);
    // }
    return user;
  }

  public async getAll(): Promise<IUsuario[] | null> {
    const user = await this.usuarioRepository.getAll();

    if (!user || user.length === 0) {
      throw new UsuarioNotFound();
    }

    return user;
  }

  public async getById(id: number): Promise<IUsuario | null> {
    const user = await this.usuarioRepository.getById(id);

    if (!user) {
      throw new UsuarioNotFound();
    }

    return user;
  }

  public async getByNome(descricao: string): Promise<IUsuario | null> {
    const user = await this.usuarioRepository.getByNome(descricao);

    if (!user) {
      throw new UsuarioNotFound();
    }

    return user;
  }

  public async update(id: number, data: UpdateUsuarioDTO): Promise<IUsuario | null> {
    const existsUser = await this.getById(id);

    if (!existsUser) {
      throw new UsuarioNotFound();
    }

    const user = await this.usuarioRepository.update(id, {
      perfil_id: data.perfil_id,
      nome: data.nome,
      administrador: data.administrador,
    });

    return user;
  }

  public async delete(id: number): Promise<IUsuario | null> {
    const existsUser = await this.getById(id);

    if (!existsUser) {
      throw new UsuarioNotFound();
    }

    const user = await this.usuarioRepository.delete(id);

    return user;
  }

  public async validationUsuario(id: number): Promise<IUsuario | null> {
    const existsUser = await this.getById(id);

    if (!existsUser) {
      throw new UsuarioNotFound();
    }

    const user = await this.usuarioRepository.validationUsuario(id);

    return user;
  }

  public async updatePassword(
    id: number,
    senha: string
  ): Promise<IUsuario | null> {
    const existsUser = await this.getById(id);

    if (!existsUser) {
      throw new UsuarioNotFound();
    }

    const passwordHash = await hasPassword(senha);

    const user = await this.usuarioRepository.updatePassword(
      id,
      (senha = passwordHash)
    );

    return user;
  }
}
