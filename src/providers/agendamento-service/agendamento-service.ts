import { Agendamento } from './../../model/Agendamento';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AgendamentoServiceProvider {

  private _url = 'https://boiling-peak-16173.herokuapp.com/api';

  constructor(private _http: HttpClient) {
   

  }

  agenda(agendamento: Agendamento){
    return this._http
            .post(this._url+'/agendamento/agenda', agendamento)
            .do(() => agendamento.enviado= true)
            .catch((err) => Observable.of(new Error('Ocorreu uma falha ao tentar realizar o agendamento!')));
  }

}
