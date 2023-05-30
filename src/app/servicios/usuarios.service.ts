import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider,EmailAuthCredential, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, QuerySnapshot , AngularFirestoreDocument, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  conexion: any = this.firebase.collection('usuarios');
  correo!: string;
  rol!:string;
  documentId!:string;
  userData:any;
  userRef: any;
 
  
  
  constructor(private auth: Auth,
    private authAngular: AngularFireAuth,
    private firebase: AngularFirestore,
    private route: Router) 
    { }

    setUserData(user: any) {
      if (user.id) { // Verificar si user.id tiene un valor
        this.userRef = this.firebase.doc(`usuarios/${user.id}`);
        this.userRef.snapshotChanges().subscribe((action: any) => {
          const exists = action.payload.exists;
          if (exists === false) {
            const rolValue = user.rol || 'default';
            this.userRef.set({
              id: user.id,
              email: user.email,
              rol: rolValue
            });
            console.log(this.userRef.id);
          }
        });
      }
    }
    
  
  register({ email, password }: any) {
    console.log('hola');
    return this.authAngular.createUserWithEmailAndPassword(email,password).then(result=>{
      alert('Usuario creado correctamente');
      this.route.navigate(['login']);
      result.user?.sendEmailVerification();
      this.setUserData(result.user);
    }
    )
    
  }
  
  login({ email, password, rol }: any) {
    return new Promise((resolve, reject) => {
      this.authAngular.signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user?.emailVerified) {
            this.setUserData(result.user);
            this.authAngular.authState.subscribe((user) => {
              if (user) {
                this.route.navigate(['main']);
                resolve(result); // Resuelve la promesa con la respuesta
              }
            });
          } else {
            console.log('adios');
            alert('ERROR, Correo electrónico no verificado');
            reject(new Error('Correo electrónico no verificado')); // Rechaza la promesa con el error
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Rechaza la promesa con el error
        });
    });
  }
    
  

  logout() {
    return signOut(this.auth);
  }
 
  createUsuario(data: any) {
    return this.conexion.add(data);
  }
  setCorreo(correo: string) {
    this.correo = correo;
  }

  setRol(rol: string) {
    this.rol = rol;
  }
  setdocumentId(documentId:string){
    this.documentId=documentId
  }

  //Metodo que recoge todos los usuarios
  getAll() {
    return this.conexion.snapshotChanges();
  }
  getUsuario(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }
  //Metodo que actualiza un usuario
  updatUsuario(coleccion: string, documentId: string, data: any) {
    return this.firebase.collection(coleccion).doc(documentId).update(data);
  }
  //Metodo que borra un usuario
  deleteUsuarioById(documentId: any) {
    return this.firebase.collection('usuarios').doc(documentId.toString()).delete();
  }

  //Metodo para reestrablecer la contraseña del usuario
  resetPassword(email: string) {
    return this.authAngular.sendPasswordResetEmail(email);
  }


  eliminarUsuarioByEmail(email: string) {
    this.authAngular.fetchSignInMethodsForEmail(email)
      .then((signInMethods) => {
        if (signInMethods && signInMethods.length > 0) {
          // El usuario existe, procedemos a eliminarlo
          this.authAngular.currentUser
            .then(user => {
              if (user) {
                user.delete();
              }
            })
            .catch((error) => {
             alert('Error al eliminar el usuario] ' + error); 
            });
        } else {
          alert('No se encontró un usuario con el email proporcionado') ;
        }
      })
      .catch((error) => {
       alert('Ocurrió un error al buscar los métodos de inicio de sesión para el email  ' + error) ;
      });
  }
  

  
}
