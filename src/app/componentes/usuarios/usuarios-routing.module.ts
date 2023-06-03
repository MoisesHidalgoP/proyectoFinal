import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';

const routes: Routes = [{ path: '', component: UsuariosComponent },
{ path : 'editarUsuario/:id' , component: EditarUsuarioComponent , canActivate: [AuthGuard]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
