import { hash } from 'bcryptjs';
import { UsuarioAlreadyExists } from '../errors/UsuarioAlreadyExists';
import { UsuarioNotFound } from '../errors/UsuarioNotFound';
import { CreateUsuarioDTO, IUsuario, UpdateUsuarioDTO } from '../interfaces/Usuario.Interface';
// import { sendEmail } from '../middlewares/sendEmail';
import { DbUsuarioRepository } from '../repository/DbUsuarioRepository';

export class UsuarioUseCase {
  constructor(private usuarioRepository: DbUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  public async createUsuario(
    email: string,
    data: CreateUsuarioDTO
  ): Promise<IUsuario | null> {
    // const existsUserByEmail = await this.usuarioRepository.getByEmail(email);

    const existsUserByUser = await this.usuarioRepository.getByUsuario(
      data.usuario
    );

    //if (existsUserByEmail || existsUserByUser) {
    if (existsUserByUser) {
      throw new UsuarioAlreadyExists();
    }

    const password_hash = await hash(data.senha, 6);

    const user = await this.usuarioRepository.createUsuario({
      perfilId: data.perfilId,
      nome: data.nome,
      usuario: data.usuario,
      senha: password_hash,
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

  public async update(id: number, data: UpdateUsuarioDTO): Promise<IUsuario | null> {
    const existsUser = await this.getById(id);

    if (!existsUser) {
      throw new UsuarioNotFound();
    }

    const user = await this.usuarioRepository.update(id, {
      perfilId: data.perfilId,
      nome: data.nome,
      usuario: data.usuario,
      senha: data.senha,
      administrador: data.administrador,
      situacao: data.situacao,
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

    const password_hash = await hash(senha, 6);

    const user = await this.usuarioRepository.updatePassword(
      id,
      (senha = password_hash)
    );

    return user;
  }
}
