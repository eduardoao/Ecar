import { Storage } from '@ionic/storage';
import { Agendamento } from './../../model/Agendamento';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  
  }


  private _geraChave(agendamento: Agendamento)
  {
    return agendamento.emailCliente + agendamento.data.toString().substring(0, 10);
  }


  salva(agendamento: Agendamento) {

    let chave = this._geraChave(agendamento);
    let promise = this._storage.set(chave, agendamento);
    //Salva se deu certo a ação de gravar o agendamento.
    
    return Observable.fromPromise(promise);
}

ehDuplicado(agendamento: Agendamento){
  let chave = this._geraChave(agendamento);
  let promise = this._storage
                    .get(chave)
                    .then(dado => {return dado ? true: false });

  return Observable.fromPromise(promise);

}

}
