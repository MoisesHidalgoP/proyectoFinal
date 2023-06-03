import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: any[] = [];
  rol!: string;
  email!:string

  constructor(private usuarioService: UsuariosService ,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private logService : LogsService) { }

  ngOnInit(): void {
    this.getAll();
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
   
  }


  getAll(){ 
    this.logService.addLog("Entramos en metodo getAll","Estamos en el componente usuarios");
    this.usuarioService.getAll().subscribe((usuariosSnapshot: any) => {
      usuariosSnapshot.forEach((usuarioData:any) => {

        this.listaUsuarios.push({
          id: usuarioData.payload.doc.id, 
          data: usuarioData.payload.doc.data()
        });
        
      });
    })
  }

   borrarUsuario(email: string) {
    this.logService.addLog("Entramos en metodo borrar usuario","Estamos en el componente usuarios");
    console.log(email);
    this.usuarioService.eliminarUsuarioByEmail(email);
  }
  

  

  editarUsuario(documentId: string) {
    this.router.navigate(['/usuarios/editarUsuario', documentId]);
  }

  cancel() {
    this.location.back();
  }

  volver(){
    this.router.navigate(['/main']);
  }

}
