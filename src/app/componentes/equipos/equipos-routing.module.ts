import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleEquipoComponent } from './detalle-equipo/detalle-equipo.component';
import { EquiposComponent } from './equipos.component';
import { EditarEquipoComponent } from './editar-equipo/editar-equipo.component';
import { AuthGuard } from '@angular/fire/auth-guard';




const routes: Routes = [{ path: '', component: EquiposComponent },
{ path : 'detallEquipo' , component: DetalleEquipoComponent , canActivate: [AuthGuard]},
{ path : 'editarEquipo/:id' , component: EditarEquipoComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
