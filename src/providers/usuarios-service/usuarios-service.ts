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
    return this._http.post<Usuario>('http://localhost:8080/api/login', {email, senha})
    .do((usuario:Usuario) => this._usuarioLogado = usuario);
  }


  public obterUsarioLogado() {
    return this._usuarioLogado;
  }

}
