import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { AsistenciasComponent } from './asistencias.component';
import { NuevoAsistenteComponent } from './nuevo-asistente/nuevo-asistente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarAsistenteComponent } from './editar-asistente/editar-asistente.component';


@NgModule({
  declarations: [
    AsistenciasComponent,
    NuevoAsistenteComponent,
    EditarAsistenteComponent
  ],
  imports: [
    CommonModule,
    AsistenciasRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AsistenciasModule { }
