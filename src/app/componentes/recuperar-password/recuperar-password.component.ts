import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  email: string = '';

  constructor(private authAngular: AngularFireAuth,
    private usuarioService: UsuariosService,
    private router: Router) { }

  ngOnInit(): void {
  }

  recuperarPassword() {
    this.usuarioService.resetPassword(this.email)
      .then(() => {
        alert("Correo de recuperación de contraseña enviado con éxito. " + 
        "Por favor, revise su bandeja de spam sino lo encuentra en su bandeja de entrada. "+
        "Gracias");
       this.router.navigate(['login']);
      })
      .catch((error) => {
        alert("Error al enviar el correo , este correo no existe en esta aplicación");
        console.log(error);
      });
  }
  volver(){
    this.router.navigate(['login']);
  }
  
}
