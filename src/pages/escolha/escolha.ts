import { Acessorio } from './../../model/acessorio';
import { Carro } from './../../model/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios=[];
  private _precoTotal: number;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams) 
     {
        this.carro =  this.navParams.get('carroSelecionado');
        this.acessorios = [
          {nome: 'Freios ABS', preco: 2500},
          {nome: 'Rodas de liga leve', preco: 2500},
          {nome: 'Computador de bordo', preco: 2500}
        ];
        this._precoTotal = this.carro.preco;

  }

  ionViewDidLoad() {    
    console.log(this.carro);
  }

  get precoTotal() {
    return this._precoTotal;
  }


  atualizaTotal(ativado: boolean, acessorio: Acessorio){
    ativado ? 
      this._precoTotal += acessorio.preco: 
      this._precoTotal -= acessorio.preco;

      console.log(this._precoTotal);
  }

}
