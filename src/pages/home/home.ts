import { EscolhaPage } from './../escolha/escolha';
import { CarrosServicesProvider } from './../../providers/carros-services/carros-services';
import { Carro } from './../../model/carro';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
  
  public carros: Carro[];
  public carroSelecionado: Carro;

  constructor(public navCtrl: NavController,     
    private _loadingCtrl: LoadingController,
    private _alertCtl: AlertController,
    private _carrosServicesProvider: CarrosServicesProvider ) {    
   
    let loading = this._loadingCtrl.create({content: 'carregando carros'});
    loading.present();

    let alert = _alertCtl.create({title: 'Falha na conexão', subTitle: 'Favor tentar mais tarde!', buttons: [{text: 'OK'}]});

    //Serviço onde se encontra a chamada API. Isolando, assim, a classe que realiza a chamada. Retorna um observable
    this._carrosServicesProvider.lista()
      .subscribe(
        //Carrega a lista de veículos com sucesso
        (carros) => {
          this.carros = carros;
          loading.dismiss();
        },
        //Apresenta na tela caso algum erro tenha ocorrido.
        (err: HttpErrorResponse) => {
          loading.dismiss(); 
          alert.present(); 
        }
      ); 
   
  }

  selecionaCarro(carro: Carro) 
  {
    //console.log(carro); 
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });  
  }

}


