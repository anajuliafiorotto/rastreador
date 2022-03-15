import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavService } from 'src/app/services/fav.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  favoritos : string [] = [];

  constructor(private favService : FavService, private router : Router, private route : ActivatedRoute) {
    this.route.params.subscribe(() => {
      this.favService.updateLocalStorage();
      this.favoritos = this.favService.favoritosCollection;
    })
  }

  ngOnInit() {
    
  }

  pesquisarFav(favorito : string){
    this.favService.fav = true;
    this.router.navigate(["/pesquisa"], {queryParams: {favorito : favorito}});
  }

}
