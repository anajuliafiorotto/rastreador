import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CorreioService } from 'src/app/services/correio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  eventosCollection : any [] = []; 

  constructor(private correioService : CorreioService, private alertController: AlertController) {}

  localizarObjeto(evento){
    let codigoObjeto : string = evento.detail.value;

    if(codigoObjeto.length < 3){
      return;
    }

    this.correioService.localizarObjeto(codigoObjeto)
    .then(response=>{
      let correio : any = response;
      this.eventosCollection = correio.objetos[0].eventos;

      if(this.eventosCollection==undefined){
        this.enviarAlert('Objeto não encontrado');
        return;
      }

      console.table(this.eventosCollection);
    })
    .catch(erro=>{
      this.enviarAlert('Objeto não encontrado');
    })
  }

  

  async enviarAlert(mensagem) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
