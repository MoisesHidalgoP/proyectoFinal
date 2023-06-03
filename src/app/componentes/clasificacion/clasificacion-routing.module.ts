import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasificacionComponent } from './clasificacion.component';
import { CrearNuevoEquipoComponent } from './crear-nuevo-equipo/crear-nuevo-equipo.component';
import { EditarClasificacionComponent } from './editar-clasificacion/editar-clasificacion.component';
import { AuthGuard } from 'src/app/auth.guard';


const routes: Routes = [{ path: '', component: ClasificacionComponent },
{ path:'crearNuevoEquipo' , component: CrearNuevoEquipoComponent , canActivate: [AuthGuard]},
{ path : 'editarClasificacion/:id' , component: EditarClasificacionComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasificacionRoutingModule { }
