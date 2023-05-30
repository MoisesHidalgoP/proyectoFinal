import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  correo!: string;
  listaUsuarios: any[] = [];

  constructor(private usuarioServicio: UsuariosService,
    private router: Router,
    private location: Location,
    private logService: LogsService
    ) { }

  ngOnInit(): void {
    this.logService.addLog("Entramos en la página principal de la aplicación web ","Estamos en el componente main");
    this.correo = localStorage.getItem('correo') || this.usuarioServicio.correo;
  }

  onClick() {
    this.usuarioServicio.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  
  

}
