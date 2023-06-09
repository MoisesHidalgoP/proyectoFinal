import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { MainComponent } from './componentes/main/main.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnviarEmailComponent } from './componentes/enviar-email/enviar-email.component';
import { EliminarCuentaComponent } from './componentes/eliminar-cuenta/eliminar-cuenta.component';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
import { EquiposRoutingModule } from './componentes/equipos/equipos-routing.module';
import { ClasificacionRoutingModule } from './componentes/clasificacion/clasificacion-routing.module';
import { GoleadoresRoutingModule } from './componentes/goleadores/goleadores-routing.module';
import { AsistenciasRoutingModule } from './componentes/asistencias/asistencias-routing.module';
import { TarjetasRoutingModule } from './componentes/tarjetas/tarjetas-routing.module';
import { UsuariosRoutingModule } from './componentes/usuarios/usuarios-routing.module';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    EnviarEmailComponent,
    EliminarCuentaComponent,
    RecuperarPasswordComponent,
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    BrowserAnimationsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    EquiposRoutingModule,
    ClasificacionRoutingModule,
    GoleadoresRoutingModule,
    AsistenciasRoutingModule,
    TarjetasRoutingModule,
    UsuariosRoutingModule
    
    
    
  
     
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
