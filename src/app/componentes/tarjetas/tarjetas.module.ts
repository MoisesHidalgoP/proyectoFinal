import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetasRoutingModule } from './tarjetas-routing.module';
import { TarjetasComponent } from './tarjetas.component';
import { NuevaTarjetaComponent } from './nueva-tarjeta/nueva-tarjeta.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarTarjetaComponent } from './editar-tarjeta/editar-tarjeta.component';


@NgModule({
  declarations: [
    TarjetasComponent,
    NuevaTarjetaComponent,
    EditarTarjetaComponent
  ],
  imports: [
    CommonModule,
    TarjetasRoutingModule,
    ReactiveFormsModule
  ]
})
export class TarjetasModule { }
