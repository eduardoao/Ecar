import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';


@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado: Usuario;

  constructor(private _http: HttpClient) {
    console.log('Hello UsuariosServiceProvider Provider');
  }

  efetuaLogin (email, senha){
    return this._http.post<Usuario>('https://boiling-peak-16173.herokuapp.com/api/login', {email, senha})
    .do((usuario:Usuario) => this._usuarioLogado = usuario);
  }


  public obterUsarioLogado() {
    return this._usuarioLogado;
  }

}
