import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  conexion: any = this.firebase.collection('usuarios');
  errorVisible: boolean = false;
  formReg!:FormGroup;
 
  constructor(private usuarioServicio: UsuariosService,
    private router: Router,
    private fb:FormBuilder,
    private firebase: AngularFirestore,
    private logService: LogsService) 
    {
      this.formReg = this.fb.group({
        email: [],
        password: [],
       
      });
     }
    
    

  ngOnInit(): void {
  }
  onSubmit() {
    this.logService.addLog("Entramos en el metodo que hace el login","Estamos en el componente login");
    this.usuarioServicio.login(this.formReg.value)
    .then((response: any) => {
      const email = this.formReg.value.email;
      
      if (email) {
        localStorage.setItem('correo', email);
        this.usuarioServicio.setCorreo(email);
        
        this.obtenerUsuarioPorEmail(email)
          .then((result: { documentId: string, data: any }) => {
            const documentId = result.documentId;
            console.log('El documentId del usuario con el correo', email, 'es:', documentId);
            localStorage.setItem('documentId', documentId);
            this.usuarioServicio.setdocumentId(documentId);
            
            const rol = result.data.rol; // Accedemos al campo 'rol' dentro de 'data'
            localStorage.setItem('rol', rol);
            this.usuarioServicio.setRol(rol);
            
            const uid = result.data.uid; // Accedemos al campo 'uid' dentro de 'data'
            console.log(uid);
            
            this.router.navigate(['/main']); // Reemplaza con la ruta correcta
          })
          .catch((error: any) => {
            console.error(error);
            this.logService.addLog(error,"Estamos en el componente usuarios");
            this.mostrarError();
          });
      }
    })
    .catch((error: any) => {
      console.log(error);
      this.mostrarError();
    });

     
  }


  mostrarError() {
    this.errorVisible = true;
  }

  cerrarError() {
    this.errorVisible = false;
  }

  

  async obtenerUsuarioPorEmail(email: string): Promise<{ documentId: string, data: any }> {
    const usuariosCollection = this.firebase.collection('usuarios');
    const querySnapshot = await usuariosCollection.ref.where('email', '==', email).get();
    if (querySnapshot.empty) {
      throw new Error('No se encontró el usuario con el email proporcionado.');
    }
    const documentId = querySnapshot.docs[0].id;
    const data = querySnapshot.docs[0].data();
    return { documentId, data };
  }
  


  getDocumentIdByEmail(correo: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      this.usuarioServicio.getAll().subscribe((usuariosSnapshot: any) => {
        let documentId: string | undefined;
  
        usuariosSnapshot.forEach((usuarioData: any) => {
          const usuario = usuarioData.payload.doc.data();
          if (usuario.correo === correo) {
            documentId = usuarioData.payload.doc.id;
          }
        });
  
        if (documentId) {
          resolve(documentId);
        } else {
          reject('No se encontró ningún usuario con el correo ' + correo);
        }
      });
    });
  }
  
  get correoNoValido(){
    return this.formReg.get('email')?.invalid && this.formReg.get('email')?.touched;
  }
  get passwordNoValido(){
    return this.formReg.get('password')?.invalid && this.formReg.get('password')?.touched;
  }

  
}





