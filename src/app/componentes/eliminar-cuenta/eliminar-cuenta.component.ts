import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-eliminar-cuenta',
  templateUrl: './eliminar-cuenta.component.html',
  styleUrls: ['./eliminar-cuenta.component.css']
})
export class EliminarCuentaComponent implements OnInit {
  listaUsuarios: any[] = [];
  correo!: string;
  documentId!:string;
  currentUser: any;
  conexion: any = this.firebase.collection('usuarios');

  constructor(private usuarioServicio: UsuariosService,
    private location: Location,
    private router: Router,
    private authAngular: AngularFireAuth,
    private firebase: AngularFirestore,
    private logService : LogsService) {
      this.conexion = this.firebase.firestore;
     }

  ngOnInit(): void {
    this.correo = localStorage.getItem('correo') || this.usuarioServicio.correo;
    this.documentId = localStorage.getItem('documentId') || this.usuarioServicio.documentId;
    this.getAll();
    
  }
   

  getAll() {

    this.logService.addLog("Entramos en metodo getAll","Estamos en el componente eliminar cuenta");
     
    console.log(this.documentId);
    this.usuarioServicio.getUsuario(this.documentId).subscribe((usuarioSnapshot: any) => {
      this.listaUsuarios.push({
        id: usuarioSnapshot.payload.id,
        data: usuarioSnapshot.payload.data()
      });
    });
  }
  borrarUsuario() {
    
    this.logService.addLog("Entramos en metodo borrar usuario","Estamos en el componente eliminar cuenta");

    const confirmacion = confirm('¿Estás seguro de que deseas borrar este usuario?');
    if (!confirmacion) {
      return; // Cancelar la acción si el usuario no confirma
    }
  
    // Eliminar el usuario de Firestore
    this.conexion
      .collection('usuarios')
      .doc(this.documentId)
      .delete()
      .then(() => {
        // Usuario eliminado exitosamente de Firestore
        // Eliminar el usuario de Firebase Authentication
        this.authAngular.currentUser
          .then((user: any) => {
            if (user) {
              user.delete()
                .then(() => {
                 
                  this.router.navigate(['/login']); // Redireccionar al componente "login"
                })
                .catch((error: any) => {
                  console.error(error);
                  alert('Ha ocurrido un error al borrar el usuario en Firebase Authentication');
                  this.logService.addLog(error,"Estamos en el componente usuarios");
                });
            } else {
              // El usuario no está autenticado actualmente
              alert('No se pudo encontrar el usuario actual');
            }
          })
          .catch((error: any) => {
            console.error(error);
            alert('Ha ocurrido un error al obtener el usuario actual');
          });
      })
      .catch((error: any) => {
        console.error(error);
        alert('Ha ocurrido un error al borrar el usuario en Firestore');
        this.logService.addLog(error,"Estamos en el componente eliminar cuenta");
      });
  }
  
  cancel() {
    this.location.back();
  }
  volver(){
    this.router.navigate(['/main']);
  }
}
