import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavService {
  favoritosCollection : any [] = [];
  fav : boolean = false;

  constructor() { 
    this.favoritosCollection = JSON.parse(localStorage.getItem("favoritos")) || [];
  }

  addFav(novoFav : any){
    if(this.favoritosCollection.includes(novoFav)){
      this.removeFav(novoFav);
    }
    else {
      this.favoritosCollection.push(novoFav);
      localStorage.setItem("favoritos", JSON.stringify(this.favoritosCollection));
    }
  }

  updateLocalStorage(){
    localStorage.setItem('favoritos', JSON.stringify(this.favoritosCollection));
  }

  removeFav(antigoFav : any){
    this.favoritosCollection = this.favoritosCollection.filter(antigoFavArray => antigoFav != antigoFavArray);
    this.updateLocalStorage();
  }
}
