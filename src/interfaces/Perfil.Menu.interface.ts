export interface IPerfilMenu {
    id?: number;
    perfil_id: number;
    menu_id: number;
  }
  
  export interface CreatePerfilMenuDTO {
    perfil_id: number;
    menu_id: number;
  }
  
  export interface UpdatePerfilMenuDTO {
    id: number;
    perfil_id: number;
    menu_id: number;
  }
  