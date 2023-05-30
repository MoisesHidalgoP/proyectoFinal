import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formReg!:FormGroup;

  constructor(
    private usuarioServicio: UsuariosService,
    private router: Router,
    private fb:FormBuilder,
    private logService : LogsService
  ) 
  {
    this.formReg = this.fb.group({
      email: ['' , [Validators.required, Validators.email ,Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required]],
      nombreCompleto:['',[Validators.required , Validators.minLength(5) , Validators.maxLength(50), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
      movil: ['' , [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      rol: [1],
    });
    
  }

  

  ngOnInit(): void {
  }

  onSubmit() {
    this.logService.addLog("Entramos en metodo que hace el register","Estamos en el componente register");
    if(this.formReg.valid){
      this.usuarioServicio.register(this.formReg.value)
      .then((response: any) => {
        console.log(response);
        this.usuarioServicio.createUsuario(this.formReg.value)
        this.router.navigate(['/login']);
      })
      .catch((error: any) => alert("Error está cuenta ya está siendo usada"));
    }
   
      
  }



  get nombreNoValido(){
    return this.formReg.get('nombreCompleto')?.invalid && this.formReg.get('nombreCompleto')?.touched;
  }
  
  get correoNoValido(){
    return this.formReg.get('email')?.invalid && this.formReg.get('email')?.touched;
  }
  get passwordNoValido(){
    return this.formReg.get('password')?.invalid && this.formReg.get('password')?.touched;
  }
  get movilNoValido(){
    return this.formReg.get('movil')?.invalid && this.formReg.get('movil')?.touched;
  }

}


