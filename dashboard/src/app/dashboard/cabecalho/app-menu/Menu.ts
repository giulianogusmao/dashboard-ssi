export class Menu {
  label: string;
  link: string;
  canAccess: Array<string>;
  isVisible: boolean;

  constructor(label: string, link: string = '/', canAccess: Array<string> = [], isVisible: boolean = true) {
    this.label = label;
    this.link = link;
    this.canAccess = canAccess;
    this.isVisible = isVisible;
  }

  canBeAccessed(tipoUsuario: string) {
    if (this.canAccess.length === 0) {
      return true;
    }

    try {
      const res = this.canAccess.find(acesso =>
        acesso.toLocaleLowerCase() === tipoUsuario.toLocaleLowerCase());

      return !!res;
    } catch (e) {
      return false;
    }
  }
}
