import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../model/carro';

@Injectable()
export class CarrosServicesProvider {

  constructor(private _http: HttpClient) {
    console.log('Hello CarrosServicesProvider Provider');
  }

  lista() {
    return this._http.get<Carro[]>('http://192.168.0.17:8080/api/carro/ListaTodos')
  };

}
