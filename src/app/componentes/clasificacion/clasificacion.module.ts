import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasificacionRoutingModule } from './clasificacion-routing.module';
import { ClasificacionComponent } from './clasificacion.component';
import { EditarClasificacionComponent } from './editar-clasificacion/editar-clasificacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearNuevoEquipoComponent } from './crear-nuevo-equipo/crear-nuevo-equipo.component';


@NgModule({
  declarations: [
    ClasificacionComponent,
    EditarClasificacionComponent,
    CrearNuevoEquipoComponent
  ],
  imports: [
    CommonModule,
    ClasificacionRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClasificacionModule { }
