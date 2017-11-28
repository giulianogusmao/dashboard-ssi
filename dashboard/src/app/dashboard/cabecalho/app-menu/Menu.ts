export class Menu {
  label: string;
  link: string;
  admin?: boolean;

  constructor(label: string, link?: string) {
    this.label = label;
    this.link = link || '/';
  }
}
