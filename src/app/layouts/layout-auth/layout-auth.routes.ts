import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LayoutAuthComponent } from './layout-auth.component';


const ROUTES: Routes = [{
    path: 'auth',
    component: LayoutAuthComponent,
    children: [
        { path: 'login', component: LoginComponent },
        { path: 'registrarUsuario', component: RegistroUsuarioComponent },
        { path: '**', pathMatch: 'full', redirectTo: 'login' },
    ]
}];

export const LAYOUT_AUTH_ROUTES = RouterModule.forChild(ROUTES);