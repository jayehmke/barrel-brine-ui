import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LocationsComponent } from './locations';
import { ProductComponent } from './product';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'products', component: ProductComponent },
  // { path: 'detail', loadChildren: './+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
