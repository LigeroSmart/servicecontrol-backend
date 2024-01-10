import { PerfilAlreadyExists } from '../errors/PerfilAlreadyExists';
import { PerfilNotFound } from '../errors/PerfilNotFound';
import { CreatePerfilDTO, IPerfil, UpdatePerfilDTO } from '../interfaces/Perfil.interface';
import { CreatePerfilMenuDTO, IPerfilMenu, UpdatePerfilMenuDTO } from '../interfaces/Perfil.Menu.interface';
import { DbPerfilRepository } from '../repository/DbPerfilRepository';
import { DbPerfilMenuRepository } from '../repository/DbPerfilMenuRepository';
import { Console } from 'console';

export class PerfilUseCase {
  constructor(
    private perfilRepository: DbPerfilRepository, 
    private perfilMenuRepository: DbPerfilMenuRepository) {
    
    this.perfilRepository = perfilRepository;
    this.perfilMenuRepository = perfilMenuRepository;
  }

  public async createPerfil(
    descricao: string,
    data: CreatePerfilDTO,
    itens: []
  ): Promise<IPerfil | null> {

    const existsPerfilByDescricao = await this.perfilRepository.getByDescricao(
      descricao
    );

    if (existsPerfilByDescricao) {
      throw new PerfilAlreadyExists();
    }

    const perfilIncluir = await this.perfilRepository.createPerfil({
      descricao: data.descricao,
      situacao: data.situacao
    });

    let idPerfil : number = perfilIncluir.id;

    itens.forEach(async menuItem => {
      let menuId : number = menuItem.menu_id;

      let perfilMenu = await this.perfilMenuRepository.createPerfilMenu({
          perfil_id: idPerfil,
          menu_id: menuId,
        });
    })

    const perfil = await this.perfilRepository.getById(idPerfil);

    return perfil;
  }

  public async getAll(): Promise<IPerfil[] | null> {
    const perfil = await this.perfilRepository.getAll();

    if (!perfil || perfil.length === 0) {
      throw new PerfilNotFound();
    }

    return perfil;
  }

  public async getById(id: number): Promise<IPerfil | null> {
    const perfil = await this.perfilRepository.getById(id);

    if (!perfil) {
      throw new PerfilNotFound();
    }

    return perfil;
  }

  public async update(
    id: number, 
    data: UpdatePerfilDTO,
    itens: []
    ): Promise<IPerfil | null> {
    const existsPerfil = await this.getById(id);

    if (!existsPerfil) {
      throw new PerfilNotFound();
    }

    const perfil = await this.perfilRepository.update(id, {
      descricao: data.descricao,
      situacao: data.situacao,
    });

    itens.forEach(async menuItem => {
      let menuId : number = menuItem.menu_id;

      if (menuItem.deleted) {
        const perfilMenu = await this.perfilMenuRepository.delete(menuItem.id);

      } else {
        if (menuItem.id > 0) {
          let perfilMenu = await this.perfilMenuRepository.update(menuItem.id, {
            perfil_id: menuItem.perfil_id,
            menu_id: menuItem.menu_id,
          });
        } 
        else {
          let perfilMenu = await this.perfilMenuRepository.createPerfilMenu({
            perfil_id: menuItem.perfil_id,
            menu_id: menuId,
          });
         }  
      }
    });

    return perfil;
  }

  public async delete(id: number): Promise<IPerfil | null> {
    const existsPerfil = await this.getById(id);

    if (!existsPerfil) {
      throw new PerfilNotFound();
    }

    const perfil = await this.perfilRepository.delete(id);

    return perfil;
  }
  
}
