import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataUsuario: any;
  datosUsuario: FormGroup;
 

  constructor( private fb: FormBuilder,
    private location: Location,
    private usuarioService: UsuariosService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService: LogsService) 
    { 
      this.datosUsuario = this.fb.group({
        email: [{ value: '', disabled: true }, Validators.required],
        rol: ['', [Validators.required, Validators.pattern('^[01]$')]],
        nombreCompleto: ['',[Validators.required , Validators.minLength(5) , Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
        movil:  ['' , [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      });
    }
    

  ngOnInit(): void {
    
    this.logService.addLog("Entramos en el formulario editar un usuario","Estamos en el componente usuarios");

    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.usuarioService.getUsuario(this.documentId).subscribe(
          (resp: any) => {
            this.datosUsuario.patchValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })
  }



  get rolNoValido(){
    return this.datosUsuario.get('rol')?.invalid && this.datosUsuario.get('rol')?.touched;
  }

  get nombreNoValido(){
    return this.datosUsuario.get('nombreCompleto')?.invalid && this.datosUsuario.get('nombreCompleto')?.touched;
  }

  get movilNoValido(){
    return this.datosUsuario.get('movil')?.invalid && this.datosUsuario.get('movil')?.touched;
  }


  actualizarEstado() {
    this.logService.addLog("Entramos en el metodo actualizar un usuario ","Estamos en el componente usuarios");
    this.dataUsuario = this.datosUsuario.value;
  
    if (this.datosUsuario.valid) {
      console.log("Estas entrado por aqui");
      
      const emailControl = this.datosUsuario.get('email');
      if (emailControl) {
        const email = emailControl.value;
        
        if (email === 'moihidalgop99@gmail.com' && this.dataUsuario.rol !== '') {
          alert("No se puede cambiar el rol para el email moihidalgop99@gmail.com porque es el creador de la aplicación web.");
          return;
        }
      }
      
      this.usuarioService.updatUsuario("usuarios", this.documentId, this.dataUsuario).then(
        () => {
          alert("Registro actualizado");
          this.router.navigate(['/main']);
        },
        (error: any) => {
          alert("¡Ha ocurrido un error!");
          console.log(error);
          this.logService.addLog(error,"Estamos en el componente usuarios");
        }
      );
    } else {
      this.dataUsuario.reset();
      alert("Complete los campos");
    }
  }
  

  volver(){
    this.router.navigate(['/usuarios']);
  }

}
