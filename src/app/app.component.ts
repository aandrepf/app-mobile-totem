import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Config } from './models/config';
import { ConfigService } from './services/config.service';
import { RoutingState } from './routingState.service';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subConfig: Subscription;
  public urls: Config;

  constructor(
    private _config: ConfigService,
    private routingState: RoutingState,
    private _userIdle: UserIdleService) {
      this.routingState.loadRouting();
      console.log('VERSÃO MOBILE', '1.3.3');
  }

  @HostListener('window:click') windowClick(): void { this._userIdle.resetTimer(); }

  ngOnInit() {
    this.configUrls();
  }

  ngOnDestroy() {
    this._subConfig.unsubscribe();
  }

  configUrls() {
    this._subConfig = this._config.getUrls().subscribe(
      data => {
        this.urls = data[0];
        sessionStorage.setItem('urls', JSON.stringify(this.urls));
      },
      err => console.error(err)
    );
  }
}
