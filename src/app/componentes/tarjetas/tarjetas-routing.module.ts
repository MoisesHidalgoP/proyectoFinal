import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetasComponent } from './tarjetas.component';
import { NuevaTarjetaComponent } from './nueva-tarjeta/nueva-tarjeta.component';
import { EditarTarjetaComponent } from './editar-tarjeta/editar-tarjeta.component';
import { AuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [{ path: '', component: TarjetasComponent },
  {path: 'nuevaTarjeta' , component:NuevaTarjetaComponent , canActivate: [AuthGuard] },
  {path: 'editarTarjeta/:id' , component:EditarTarjetaComponent , canActivate: [AuthGuard] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetasRoutingModule { }
