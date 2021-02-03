import { Routes, RouterModule } from '@angular/router';
import { LayoutAdminModule } from './layout-admin.module';
import { HomeComponent } from './home/home.component';
import { HeroeComponent } from './heroe/heroe.component';
import { HeroesComponent } from './heroes/heroes.component';
import { RegistrarEditarHeroeComponent } from './registrar-editar-heroe/registrar-editar-heroe.component';
import { LayoutAdminComponent } from './layout-admin.component';
import { UsuarioGuard } from '../../services/guards/usuario.guard';
import { LoginComponent } from '../layout-auth/login/login.component';



const ROUTES: Routes = [{
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [UsuarioGuard],
    children: [
        { path: 'home', component: HomeComponent },
        { path: 'heroe/:id', component: HeroeComponent },
        { path: 'heroes', component: HeroesComponent },
        { path: 'registrarHeroe', component: RegistrarEditarHeroeComponent },
        { path: 'editarHeroe/:id', component: RegistrarEditarHeroeComponent },
        { path: '**', pathMatch: 'full', redirectTo: 'home' },
    ]
}
];

export const LAYOUT_ADMIN_ROUTES = RouterModule.forChild(ROUTES);