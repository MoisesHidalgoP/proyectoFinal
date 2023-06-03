import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoleadoresService } from 'src/app/servicios/goleadores.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-editar-jugador',
  templateUrl: './editar-jugador.component.html',
  styleUrls: ['./editar-jugador.component.css']
})
export class EditarJugadorComponent implements OnInit {
  listaGoleadores: any[] = [];
  datosJugador!:FormGroup;
  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataJugador: any;
  rol!:string;

  constructor(private fb: FormBuilder,
    private location: Location,
    private goleadorService: GoleadoresService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService: LogsService,
    private usuarioService: UsuariosService) 
    { 
      //Formulario
  this.datosJugador = this.fb.group({
    nombre: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40) , Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    equipo: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    nacionalidad: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40) , Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    edad: ['', [Validators.required , Validators.minLength(1) ,Validators.pattern(/^(1[5-9]|[2-5]\d|60)$/)]],
    gol: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^(?:[1-9]|[1-9]\d|100)$/)]]
   
    
  });
    }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
    this.logService.addLog("Entramos el formulario editar goleadoar","Estamos en el componente goleadores");
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.goleadorService.getGoleador(this.documentId).subscribe(
          (resp: any) => {
            this.datosJugador.patchValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })
  }

  get nombreNoValido(){
    return this.datosJugador.get('nombre')?.invalid && this.datosJugador.get('nombre')?.touched;
  }
  get equipoNoValido(){
    return this.datosJugador.get('equipo')?.invalid && this.datosJugador.get('equipo')?.touched;
  }
  get nacionalidadNoValido(){
    return this.datosJugador.get('nacionalidad')?.invalid && this.datosJugador.get('nacionalidad')?.touched;
  }
  get edadNoValido(){
    return this.datosJugador.get('edad')?.invalid && this.datosJugador.get('edad')?.touched;
  }
  get golNoValido(){
    return this.datosJugador.get('gol')?.invalid && this.datosJugador.get('gol')?.touched;
  }


  actualizarEstado(){
    this.logService.addLog("Entramos en el metodo actulizar un goleador","Estamos en el componente goleadores");
    this.dataJugador = this.datosJugador.value;

    if (this.datosJugador.valid) {
      console.log("Estas entrado por aqui");
      this.goleadorService.updateGoleador("goleadores",this.documentId, this.dataJugador).then(
        () => {
          alert("Registro actualizado");
          this.router.navigate(['/goleadores']);
        },
        (error: any) => {
          alert("¡A ocurrido un error!");
          console.log(error);
          this.logService.addLog(error,"Estamos en el componente goleadores");
        }
      );
  
    }else{
      this.dataJugador.reset();
      alert("Complete los campos");
    }
  }


  

  volver(){
    this.router.navigate(['/goleadores']);
  }


}
