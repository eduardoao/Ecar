import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../model/carro';

@Injectable()
export class CarrosServicesProvider {

  constructor(private _http: HttpClient) {
    console.log('Hello CarrosServicesProvider Provider');
  }

  lista() {
    return this._http.get<Carro[]>('https://boiling-peak-16173.herokuapp.com/api/carro/ListaTodos')
  };

}
