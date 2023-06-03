import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AuthGuard } from './auth.guard';
import { EliminarCuentaComponent } from './componentes/eliminar-cuenta/eliminar-cuenta.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';




const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegisterComponent  },
  { path: 'goleadores', loadChildren: () => import('./componentes/goleadores/goleadores.module').then(m => m.GoleadoresModule) , canActivate: [AuthGuard] },
  { path: 'equipos', loadChildren: () => import('./componentes/equipos/equipos.module').then(m => m.EquiposModule) , canActivate: [AuthGuard] },
  { path: 'clasificacion', loadChildren: () => import('./componentes/clasificacion/clasificacion.module').then(m => m.ClasificacionModule) , canActivate: [AuthGuard] },
  { path: 'eliminarCuenta' , component: EliminarCuentaComponent , canActivate: [AuthGuard]},
  { path: 'usuarios', loadChildren: () => import('./componentes/usuarios/usuarios.module').then(m => m.UsuariosModule) , canActivate: [AuthGuard] }, 
  {path: 'recuperarContraseña' , component:RecuperarPasswordComponent   },
  { path: 'asistencias', loadChildren: () => import('./componentes/asistencias/asistencias.module').then(m => m.AsistenciasModule), canActivate: [AuthGuard] },
  { path: 'tarjetas', loadChildren: () => import('./componentes/tarjetas/tarjetas.module').then(m => m.TarjetasModule), canActivate: [AuthGuard] },
  {path: '**' , redirectTo:'/login', pathMatch:'full'}
  
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

