import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { DetalleEquipoComponent } from './detalle-equipo/detalle-equipo.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarEquipoComponent } from './editar-equipo/editar-equipo.component';


@NgModule({
  declarations: [
    EquiposComponent,
    DetalleEquipoComponent,
    EditarEquipoComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class EquiposModule { }
