import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { CorreioService } from 'src/app/services/correio.service';
import { FavService } from 'src/app/services/fav.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {

  eventosCollection : any [] = []; 
  codigoObjeto : string;

  constructor(private correioService : CorreioService, private alertCtrl: AlertController, private favService : FavService, private route: ActivatedRoute, private actionSheetCtrl : ActionSheetController) {
    this.route.queryParams.subscribe((params) => {
      this.codigoObjeto = params.favorito;
      this.localizarObjeto();
      console.log(this.codigoObjeto);
    })
  }

  ngOnInit() {
    
  }

  localizarObjeto(evento ?){
    if(this.favService.favoritosCollection.includes(evento?.detail.value)){
      
    }
    
    this.codigoObjeto  = evento?.detail.value || this.codigoObjeto;
    console.log(this.codigoObjeto);

    if(this.codigoObjeto.length < 3){
      return;
    }

    this.correioService.localizarObjeto(this.codigoObjeto)
    .then(response=>{
      let correio : any = response;
      this.eventosCollection = correio.objetos[0].eventos;

      if(this.eventosCollection==undefined){
        this.enviarAlert('Objeto não encontrado');
        return;
      }

      else {
        console.table(this.eventosCollection);
      }
      
    })
    .catch(erro=>{
      this.enviarAlert('Objeto não encontrado');
    })
  }

  async enviarAlert(mensagem) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

  async addFav(){
    console.log(this.favService.fav);
    const alert = await this.actionSheetCtrl.create({
      header: 'O QUE DESEJA FAZER',

      buttons: [
        {
          text: this.favService.fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
          icon: this.favService.fav ? 'heart-dislike-outline' : 'heart-outline',
          handler: () => {
            
            this.favService.addFav(this.codigoObjeto);
            this.favService.fav = !this.favService.fav;
            console.log(this.favService.fav);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await alert.present();

    const { role, data } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
