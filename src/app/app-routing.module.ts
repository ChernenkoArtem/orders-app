import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from './pages/categories/categories.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'categories' ,
    component: CategoriesComponent,
    data: {filter: 'all'},
    children: [
      { path: 'drink' , component: CategoriesComponent , data : {filter: 'drink'} , pathMatch: 'full' },
      { path: 'food' , component: CategoriesComponent , data: {filter: 'food'}},
      { path: 'special', component: CategoriesComponent , data: {filter: 'special'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
