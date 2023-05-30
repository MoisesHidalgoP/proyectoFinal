import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoleadoresRoutingModule } from './goleadores-routing.module';
import { GoleadoresComponent } from './goleadores.component';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarJugadorComponent } from './editar-jugador/editar-jugador.component';


@NgModule({
  declarations: [
    GoleadoresComponent,
    NuevoJugadorComponent,
    EditarJugadorComponent
  ],
  imports: [
    CommonModule,
    GoleadoresRoutingModule,
    ReactiveFormsModule
  ]
})
export class GoleadoresModule { }
