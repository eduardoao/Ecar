import { HomePage } from './../home/home';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from './../../model/Agendamento';
import { AgendamentoServiceProvider } from './../../providers/agendamento-service/agendamento-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, DateTime } from 'ionic-angular';
import { Carro } from '../../model/carro';


@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  public nome:      string= '';
  public endereco:  string = '';
  public email:     string = '';
  public data:      string;
  private _alerta: Alert;
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private _agendamentoServiceProvider: AgendamentoServiceProvider,     
      private _alertCtl: AlertController,
      private _agendamentoDAO: AgendamentoDaoProvider
      ) 
      {
        this.carro =  this.navParams.get('carroSelecionado');
        this.precoTotal = this.navParams.get('precoTotal');      
      }

 
  agenda() {  

    let agendamento : Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal : this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data      
    };


    this._alerta = this._alertCtl.create({
      title: 'Aviso', 
      buttons: [
        {
          text: 'OK',
          handler: ()=> { this.navCtrl.setRoot(HomePage); }
        }
      ]
      });

    let mensagem ='';

    this._agendamentoDAO.ehDuplicado(agendamento)
        .mergeMap(ehDuplicado => {
          if (ehDuplicado) {
            throw new Error ('Agendamento já realizado anteriormente!');
          }
          return  this._agendamentoServiceProvider.agenda(agendamento);
        }
          
    )  
    .mergeMap((valor)=> {
      let observable = this._agendamentoDAO.salva(agendamento);
      if (valor instanceof(Error)) {
        throw valor;
      }
      return observable;
    })
    .finally(
     () => 
        {         
          this._alerta.setSubTitle(mensagem);         
          this._alerta.present();
        }
    ) 
    .subscribe(
        ()=>  mensagem ='Agendado!' ,
        (err: Error)=>  mensagem =err.message
      )
      
  }
}
