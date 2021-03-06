import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from 'angular2-useful-swiper';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccordionModule } from 'primeng/primeng';
import 'hammerjs';
import {
  MdCardModule,
  MdToolbarModule,
  MdSidenavModule,
  MdButtonModule,
  MdProgressBarModule,
  MdIconModule,
  MdButtonToggleModule,
  MdSliderModule,
  MdInputModule,
  MdSelectModule,
  MdTabsModule,
} from '@angular/material';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';
import { FacebookModule } from 'ngx-facebook';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HttpService } from './lib/http';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LocationsComponent } from './locations'
import { NoContentComponent } from './no-content';

import '../styles/styles.scss';
import '../styles/headings.css';
import { ProductComponent } from './product';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  HttpService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    LocationsComponent,
    ProductComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAmWmYR440qnn5BRZ1vnHo7Ysb2-m8NJ0'
    }),
    FacebookModule.forRoot(),
    FlexLayoutModule,
    BrowserAnimationsModule,
    SwiperModule,
    MdCardModule,
    MdToolbarModule,
    MdSidenavModule,
    MdButtonModule,
    MdProgressBarModule,
    MdIconModule,
    MdButtonToggleModule,
    AccordionModule,
    MdSliderModule,
    MdInputModule,
    MdSelectModule,
    MdTabsModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef,
              public appState: AppState) {
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
