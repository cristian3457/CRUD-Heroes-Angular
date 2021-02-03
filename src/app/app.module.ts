import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutAdminModule } from './layouts/layout-admin/layout-admin.module';
import { LayoutAuthModule } from './layouts/layout-auth/layout-auth.module';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutAdminModule,
    LayoutAuthModule,
    RouterModule,
    APP_ROUTES,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
