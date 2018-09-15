import { AgendamentoServiceProvider } from './../../providers/agendamento-service/agendamento-service';
import { Agendamento } from './../../model/Agendamento';
import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {

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

}
