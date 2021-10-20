import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoriesComponent} from './pages/categories/categories.component';
import {CoreModule} from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {LeftSideBarComponent} from './shared/left-side-bar/left-side-bar.component';
import {MatListModule} from '@angular/material/list';

import {categoriesReducer} from './core/store/reducers/categories.reducer';
import {StoreModule} from '@ngrx/store';
import {CategoriesEffects} from './core/store/effects/categories.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {ModalComponent} from './shared/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FooterComponent} from './shared/footer/footer.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {AuthComponent} from './shared/auth/auth.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './shared/header/header.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AuthEffects} from './core/store/effects/auth.effects';
import {userReducer} from './core/store/reducers/auth.reducer';
import {CustomerComponent} from './pages/customer/customer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {AddTokenInterceptor} from './core/interceptors/add-token.interceptor';

const TYPES = ['food', 'drink', 'special'];
export const randomizer = () => {
  const index = Math.floor(Math.random() * 3);
  return TYPES[index];
};


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    LeftSideBarComponent,
    ModalComponent,
    FooterComponent,
    AuthComponent,
    HeaderComponent,
    UserPageComponent,
    AdminComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({categories: categoriesReducer, auth: userReducer}),
    EffectsModule.forRoot([CategoriesEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
