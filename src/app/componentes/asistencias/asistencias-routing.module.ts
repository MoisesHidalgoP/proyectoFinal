import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciasComponent } from './asistencias.component';
import { NuevoAsistenteComponent } from './nuevo-asistente/nuevo-asistente.component';
import { EditarAsistenteComponent } from './editar-asistente/editar-asistente.component';
import { AuthGuard } from 'src/app/auth.guard';



const routes: Routes = [{ path: '', component: AsistenciasComponent },
{path: 'nuevoAsistente' , component: NuevoAsistenteComponent , canActivate: [AuthGuard] },
{path: 'editarAsistente/:id' , component: EditarAsistenteComponent , canActivate: [AuthGuard] } ,];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciasRoutingModule { }
