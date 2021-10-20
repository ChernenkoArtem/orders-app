import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from './pages/categories/categories.component';
import {AuthGuard} from './core/guards/auth.guard';
import {CustomerComponent} from './pages/customer/customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'categories' ,
    component: CategoriesComponent,
    data: {filter: 'all'},
    canActivate: [AuthGuard],
    children: [
      { path: 'drink' , component: CategoriesComponent , data : {filter: 'drink'}},
      { path: 'food' , component: CategoriesComponent , data: {filter: 'food'}},
      { path: 'special', component: CategoriesComponent , data: {filter: 'special'}}
    ]
  },
  { path: 'order' , component: CustomerComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
