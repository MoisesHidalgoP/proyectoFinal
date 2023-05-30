import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { RegisterComponent } from './componentes/register/register.component';
import {  canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DetalleEquipoComponent } from './componentes/equipos/detalle-equipo/detalle-equipo.component';
import { EditarEquipoComponent } from './componentes/equipos/editar-equipo/editar-equipo.component';
import { EditarUsuarioComponent } from './componentes/usuarios/editar-usuario/editar-usuario.component';
import { EditarClasificacionComponent } from './componentes/clasificacion/editar-clasificacion/editar-clasificacion.component';
import { CrearNuevoEquipoComponent } from './componentes/clasificacion/crear-nuevo-equipo/crear-nuevo-equipo.component';
import { AuthGuard } from './auth.guard';
import { EliminarCuentaComponent } from './componentes/eliminar-cuenta/eliminar-cuenta.component';
import { NuevoJugadorComponent } from './componentes/goleadores/nuevo-jugador/nuevo-jugador.component';
import { EditarJugadorComponent } from './componentes/goleadores/editar-jugador/editar-jugador.component';
import { NuevoAsistenteComponent } from './componentes/asistencias/nuevo-asistente/nuevo-asistente.component';
import { EditarAsistenteComponent } from './componentes/asistencias/editar-asistente/editar-asistente.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { NuevaTarjetaComponent } from './componentes/tarjetas/nueva-tarjeta/nueva-tarjeta.component';
import { EditarTarjetaComponent } from './componentes/tarjetas/editar-tarjeta/editar-tarjeta.component';



const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: RegisterComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'goleadores', loadChildren: () => import('./componentes/goleadores/goleadores.module').then(m => m.GoleadoresModule) , canActivate: [AuthGuard] },
  { path: 'equipos', loadChildren: () => import('./componentes/equipos/equipos.module').then(m => m.EquiposModule) , canActivate: [AuthGuard] },
  { path: 'clasificacion', loadChildren: () => import('./componentes/clasificacion/clasificacion.module').then(m => m.ClasificacionModule) , canActivate: [AuthGuard] },
  {path:'crearNuevoEquipo' , component: CrearNuevoEquipoComponent , canActivate: [AuthGuard]},
  { path : 'detallEquipo' , component: DetalleEquipoComponent , canActivate: [AuthGuard]},
  { path : 'detallEquipo/:id' , component: DetalleEquipoComponent , canActivate: [AuthGuard]},
  { path : 'editarEquipo/:id' , component: EditarEquipoComponent , canActivate: [AuthGuard]},
  { path : 'editarUsuario/:id' , component: EditarUsuarioComponent , canActivate: [AuthGuard]},
  {path: 'eliminarCuenta' , component: EliminarCuentaComponent , canActivate: [AuthGuard]},
  {path: 'nuevoJugador' , component: NuevoJugadorComponent , canActivate: [AuthGuard]},
  {path:'editarGoleador/:id' , component: EditarJugadorComponent,canActivate: [AuthGuard] },
  { path : 'editarClasificacion/:id' , component: EditarClasificacionComponent , canActivate: [AuthGuard]},
  { path: 'usuarios', loadChildren: () => import('./componentes/usuarios/usuarios.module').then(m => m.UsuariosModule) , canActivate: [AuthGuard] },
  {path: 'nuevoAsistente' , component: NuevoAsistenteComponent , canActivate: [AuthGuard] },
  {path: 'editarAsistente/:id' , component: EditarAsistenteComponent , canActivate: [AuthGuard] } , 
  {path: 'recuperarContraseña' , component:RecuperarPasswordComponent   },
  { path: 'asistencias', loadChildren: () => import('./componentes/asistencias/asistencias.module').then(m => m.AsistenciasModule), canActivate: [AuthGuard] },
  { path: 'tarjetas', loadChildren: () => import('./componentes/tarjetas/tarjetas.module').then(m => m.TarjetasModule), canActivate: [AuthGuard] },
  {path: 'nuevaTarjeta' , component:NuevaTarjetaComponent , canActivate: [AuthGuard] },
  {path: 'editarTarjeta/:id' , component:EditarTarjetaComponent , canActivate: [AuthGuard] },
  {path: '**' , redirectTo:'/login', pathMatch:'full'},
  
  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

