
import { Observable } from 'rxjs/Observable';
import { EscolhaPage } from './../pages/escolha/escolha';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListaAgendamentosPage } from './../pages/lista-agendamentos/lista-agendamentos';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServicesProvider } from '../providers/carros-services/carros-services';
import { AgendamentoServiceProvider } from '../providers/agendamento-service/agendamento-service';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';

import { IonicStorageModule} from '@ionic/storage';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';



@NgModule({
  declarations: [
    MyApp,
    HomePage   
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, //Tem que importar para realizar requisições em HTTP.
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(
      {
        name:  'Ecar',
        storeName: 'agendamentos',
        driverOrder: ['indexeddb']
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
        
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServicesProvider,
    AgendamentoServiceProvider,
    AgendamentoDaoProvider
  ]
})
export class AppModule {}
