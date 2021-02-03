import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAuthComponent } from './layout-auth.component';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LAYOUT_AUTH_ROUTES } from './layout-auth.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutAuthComponent, 
    LoginComponent, 
    RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    LAYOUT_AUTH_ROUTES,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LayoutAuthComponent
  ]
})
export class LayoutAuthModule { }
