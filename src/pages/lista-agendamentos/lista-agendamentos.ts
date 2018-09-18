import { AgendamentoServiceProvider } from './../../providers/agendamento-service/agendamento-service';
import { Agendamento } from './../../model/Agendamento';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  
  private _alerta: Alert;
  agendamentos: Agendamento[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _agendamentoProvider: AgendamentoServiceProvider ) {
  }

  ionViewDidLoad() {
     this._agendamentoDao.listaTodosAgendamentos()
         .subscribe(
           (agendamentos: Agendamento[]) => { this.agendamentos = agendamentos });
  }

  reenviar(agendamento: Agendamento){
    this._alerta = this._alertCtrl.create({
      title: 'Aviso', 
      buttons: [
        {
          text: 'OK'        
        }
      ]
      });

    let mensagem ='';
      
    this._agendamentoProvider.agenda(agendamento)
        .mergeMap((valor)=> {
                let observable = this._agendamentoDao.salva(agendamento);
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
        ()=>  mensagem ='Agendado reenviado!' ,
        (err: Error)=>  mensagem =err.message
      )
      
  }

}
