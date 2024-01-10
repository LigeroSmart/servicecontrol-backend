export class PerfilMenu {
    id: number;
    perfil_id: number;
    menu_id: number;
  
    constructor(
      id: number,
      perfil_id: number,
      menu_id: number
    ) {
      this.id = id;
      this.perfil_id = perfil_id;
      this.menu_id = menu_id;
    }
  }