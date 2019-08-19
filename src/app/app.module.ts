import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// componente pai da aplicação
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';

// arquivo de rotas da aplicação
import { routing } from './app.routing';

// módules
import { DeviceDetectorModule } from 'ngx-device-detector';
import { WelcomeModule } from './components/welcome/welcome.module';
import { IdentificacaoModule } from './components/identificacao/identificacao.module';
import { PrintModule } from './components/print/print.module';
import { GerenteModule } from './components/gerente/gerente.module';
import { ClienteModule } from './components/cliente/cliente.module';
import { ModalidadeModule } from './components/modalidade/modalidade.module';
import { CrmModule } from './components/crm/crm.module';
import { Crm2Module } from './components/crm2/crm2.module';

// services
import { ConfigService } from './services/config.service';
import { AtendimentoService } from './services/atendimento.service';

// external
import { UserIdleModule } from 'angular-user-idle';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmDialogComponent } from './utils/confirm-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RoutingState } from './routingState.service';
import { MaterialModule } from './material.module';
import { AngularValidateBrLibModule } from 'angular-validate-br';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WelcomeModule,
    IdentificacaoModule,
    PrintModule,
    GerenteModule,
    ClienteModule,
    ModalidadeModule,
    MaterialModule,
    CrmModule,
    Crm2Module,
    DeviceDetectorModule.forRoot(),
    routing,
    // idle: 10 segundos, timeout: 15 segundos, ping: 120 segundos
    UserIdleModule.forRoot({idle: 15, timeout: 15, ping: 120}),
    NgxMaskModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AngularValidateBrLibModule
  ],
  providers: [
    AtendimentoService,
    ConfigService,
    RoutingState,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
