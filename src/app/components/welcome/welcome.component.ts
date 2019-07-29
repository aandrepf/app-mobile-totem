import { UserIdleService } from 'angular-user-idle';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from '../../shared/global';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Fluxo } from '../../models/config';
import { CRM } from '../../models/crm.model';
import { RoutingState } from '../../routingState.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  deviceInfo = null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  previousRoute: string[];

  constructor(private route: Router, private userIdle: UserIdleService, private deviceService: DeviceDetectorService,
    private routingState: RoutingState) {}

  ngOnInit() {
    this.previousRoute = this.routingState.getHistory();
    this.userIdle.stopWatching();
    Global.TIPO_ATDO = new Fluxo('', null, '', new CRM(), null);
    console.log('Fluxo de entrada', Global.TIPO_ATDO);
  }

  public goIdentificacao(tipo: string): void {
    Global.TIPO_ATDO.tipo = tipo;
    tipo === 'atendimento' ? Global.TIPO_ATDO.crm.prioritario = false : Global.TIPO_ATDO.crm.prioritario = true;
    this.route.navigate(['/identificacao']);
  }

}
