import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { IdentificacaoComponent } from './components/identificacao/identificacao.component';
import { PrintComponent } from './components/print/print.component';
import { GerenteComponent } from './components/gerente/gerente.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ModalidadeComponent } from './components/modalidade/modalidade.component';
import { CrmComponent } from './components/crm/crm.component';
import { Crm2Component } from './components/crm2/crm2.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'identificacao', component: IdentificacaoComponent },
  { path: 'cliente', component: ClienteComponent},
  { path: 'modalidade', component: ModalidadeComponent},
  { path: 'crm', component: CrmComponent},
  { path: 'crm2', component: Crm2Component},
  { path: 'usergerente', component: GerenteComponent },
  { path: 'print', component: PrintComponent },
  { path: 'error', component: ErrorPageComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
