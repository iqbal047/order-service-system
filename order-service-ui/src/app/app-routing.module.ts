import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';


const routes: Routes = [
    { path: '',  title: 'Login Page', component: LoginComponent},
    { path: 'login',  title: 'Login Page', component:  LoginComponent},

  { 
    path: 'dashboard',  
    title: 'Dashboard', 
    component:  DashboardComponent,

     children: [
      {path: 'products', title: 'Product', component: ProductListComponent},
      { path: 'orders', title: 'Order', component: OrderListComponent },


     ]

  },

  { path: '**',  title: 'Login Page', component:  LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
