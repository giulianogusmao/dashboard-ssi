import { Component } from '@angular/core';

@Component({
  selector: 'app-404',
  // templateUrl: '404.component.html',
  template: `
    <div class="text-center">
      <h1>404</h1>
      <h3>Página não encontrada</h3>
      <h4>Verifique a url que está acessando</h4>
    </div>
  `,
})
export class Page404Component { }
