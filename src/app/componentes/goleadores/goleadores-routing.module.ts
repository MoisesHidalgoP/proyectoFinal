import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoleadoresComponent } from './goleadores.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { EditarJugadorComponent } from './editar-jugador/editar-jugador.component';
import { NuevoJugadorComponent } from './nuevo-jugador/nuevo-jugador.component';

const routes: Routes = [{ path: '', component: GoleadoresComponent },
{ path: 'nuevoJugador' , component: NuevoJugadorComponent , canActivate: [AuthGuard]},
{ path:'editarGoleador/:id' , component: EditarJugadorComponent,canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoleadoresRoutingModule { }
