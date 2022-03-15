import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuCollection = [
    { title: 'Início', url: 'home', icon: 'home' },
    { title: 'Pesquisar', url: 'pesquisa', icon: 'search' },
    { title: 'Favoritos', url: 'favoritos', icon: 'heart' },
  ];
  constructor() {}
}