import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { UserIdleService } from "angular-user-idle";

@Injectable()
export class RoutingState {
  private history = [];

  constructor(private router: Router, private _userIdle: UserIdleService) {}

  public loadRouting(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(({urlAfterRedirects}: NavigationEnd) => {
      this.history = [...this.history, urlAfterRedirects];
    });
  }

  public getHistory(): string[] {
    this.verifyIdleUser();
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/';
  }

  public clearHistory(): string[] {
    return this.history = [];
  }

  verifyIdleUser(): void {
    let deslocation = this.history[this.history.length - 1];
    console.log('deslocation', deslocation);
    this._userIdle.stopWatching();
    this._userIdle.stopTimer();
    if(deslocation !== '/welcome' && deslocation !== '/print') {
      this._userIdle.startWatching();
      this._userIdle.onTimerStart().subscribe(count => count == null ? console.log('não estou Idle') : console.log('contando ', count));
      this._userIdle.onTimeout().subscribe(() => {
        this.router.navigate(['/welcome']);
        const $body = document.querySelector('body');
        $body.classList.remove('body-exclusive', 'body-prime', 'body-empresas', 'bodyError');
      });
    } else {
      this._userIdle.stopWatching();
      this._userIdle.stopTimer();
    }
    /*this._userIdle.startWatching();
    if (id > '1') {
      this._userIdle.onTimerStart().subscribe(count => count == null ? console.log('não estou Idle') : console.log('contando ', count));
      this._userIdle.onTimeout().subscribe(() => {
        this.router.navigate(['/welcome']);
      });
    }
    if (id === '') {
      console.log('aqui é a pagina inicial');
      this._userIdle.stopWatching();
      this._userIdle.stopTimer();
    }*/
  }
}
