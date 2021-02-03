import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutAdminComponent } from './layout-admin.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroeComponent } from './heroe/heroe.component';
import { HomeComponent } from './home/home.component';
import { RegistrarEditarHeroeComponent } from './registrar-editar-heroe/registrar-editar-heroe.component';
import { LAYOUT_ADMIN_ROUTES } from './layout-admin.routes';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipies/pipes.module';



@NgModule({
  declarations: [
    LayoutAdminComponent, 
    HeroesComponent, 
    HeroeComponent, 
    HomeComponent, 
    RegistrarEditarHeroeComponent
  ],
  imports: [
    CommonModule,
    LAYOUT_ADMIN_ROUTES,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    LayoutAdminComponent
  ],
})
export class LayoutAdminModule { }
