import { Usuario } from './../../model/usuario';
import { UsuariosServiceProvider } from './../../providers/usuarios-service/usuarios-service';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = 'joao@alura.com.br';
  senha: string = 'alura123';

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuariosServiceProvider,
    private _alertCrtl: AlertController) {

  }

  realizarLogin(){    
    this._usuarioService.efetuaLogin (this.email, this.senha)
    .subscribe(      
      () =>{ this.navCtrl.setRoot(HomePage); }, //Caso de sucesso no login
      ()=> {                                   //Caso de falha
              this._alertCrtl.create ({
              title: 'Falha ao logar!',
              subTitle: 'Email e ou senha incorretos!',
              buttons: [{
                text: 'OK'
              }]
            }).present(); 
          }
    )


   
  }
 

}
