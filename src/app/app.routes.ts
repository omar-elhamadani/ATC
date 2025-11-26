import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { DashboardPage } from './components/dashboard-page/dashboard-page';
import { ProductDetailsPage } from './components/product-details-page/product-details-page';
import { ProductCreateComponent } from './components/product-create-page/product-create-page';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },
  { path: 'product/:id', component: ProductDetailsPage },
  { path: 'create', component: ProductCreateComponent },

  //   { path: '**', component: NotFound },
];
