import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleEquipoComponent } from './detalle-equipo/detalle-equipo.component';
import { EquiposComponent } from './equipos.component';

const routes: Routes = [{ path: '', component: EquiposComponent },
{path: 'equipos/:id', component: DetalleEquipoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
