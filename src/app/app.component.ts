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
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  public links = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Locations',
      href: '/locations',
    },
    {
      title: 'Products',
      href: '/products',
    },
    {
      title: 'FAQs',
      href: '/faqs',
    }
  ];

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
