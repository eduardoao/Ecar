import { Storage } from '@ionic/storage';
import { Agendamento } from './../../model/Agendamento';
import { AgendamentoServiceProvider } from './../../providers/agendamento-service/agendamento-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { Carro } from '../../model/carro';
import { Observable } from 'rxjs/Observable';

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
  public data:      string = new Date().toISOString();

  private _alerta: Alert;
  


  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private _agendamentoServiceProvider: AgendamentoServiceProvider,
      private _stored: Storage ) {

      this.carro =  this.navParams.get('carroSelecionado');
      this.precoTotal = this.navParams.get('precoTotal');      
  }

 
  agenda() {
    console.log (this.nome);
    console.log (this.data);

    let agendamento : Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal : this.precoTotal,
      confirmado: false,
      enviado: false,
      //dataCliente: this.data
    };


    let mensagem ='';

    this._agendamentoServiceProvider.agenda(agendamento)
    .mergeMap(()=> this.salva(agendamento))
    .finally(
     () => 
        {
          this._alerta.setSubTitle(mensagem);
          this._alerta.present();
        }
    )  
    .subscribe(
        ()=> { mensagem ='Agendado!' },
        ()=> { mensagem ='Ocorreu uma falha!'}
      )
      
  }


  salva(agendamento) {
      let chave = this.email + this.data.substr(0, 10);
      let promise = this._stored.set(chave, agendamento);
      //Salva se deu certo a ação de gravar o agendamento.
      return Observable.fromPromise(promise);
  }

}
