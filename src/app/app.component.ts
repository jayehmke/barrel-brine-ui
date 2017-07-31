/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AppState } from './app.service';


/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
    <md-sidenav-container class="app-container  mat-app-background">
      <md-sidenav #sidenav class="sidenav">
        Jolly good!
      </md-sidenav>

      <div class="main-content  mat-app-background">
        <!--<button md-button (click)="sidenav.open()">-->
        <!--Open sidenav-->
        <!--</button>-->
        <main>
          <md-toolbar color="primary">
            
            <span class="toolbar-icon-button">
              <button type="button" md-button (click)="sidenav.open()">
                <md-icon>menu</md-icon>
              </button>
              
            </span>
            <span>Barrel & Brine</span>
            <span fxHide.lt-md="true">
              <span><a md-button routerLink=".">Home</a></span>
              <span><a md-button routerLink="/locations">Locations</a></span>
              <span><a md-button routerLink="/products">Products</a></span>
            </span>
          </md-toolbar>
          <router-outlet></router-outlet>
        </main>
        <!--<footer fxLayout="row" fxFlex>-->
          <!--<span>Barrel & Brine</span>-->
        <!--</footer>-->
      </div>

    </md-sidenav-container>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {

    iconRegistry
      .addSvgIcon(
        'on-tap',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/svg/ic_local_drink_black_24px.svg'))

      .addSvgIcon(
        'bottled',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/svg/bottled.svg'))
      .addSvgIcon(
        'pickle',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/svg/pickle.svg'));
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
