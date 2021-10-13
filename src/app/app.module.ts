import {inject, InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { LeftSideBarComponent } from './shared/left-side-bar/left-side-bar.component';
import {MatListModule} from '@angular/material/list';

const TYPES = ['food', 'drink', 'special'];
export const randomizer = () => {
  const index = Math.floor(Math.random() * 3);
  return TYPES[index];
};


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LeftSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
