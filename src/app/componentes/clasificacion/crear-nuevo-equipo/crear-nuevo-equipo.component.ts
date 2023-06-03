import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasificacionService } from 'src/app/servicios/clasificacion.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-crear-nuevo-equipo',
  templateUrl: './crear-nuevo-equipo.component.html',
  styleUrls: ['./crear-nuevo-equipo.component.css']
})
export class CrearNuevoEquipoComponent implements OnInit {

  datosClasificacion!:FormGroup;
  
  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataClasificacion: any;
  rol!:string;

  constructor(private fb: FormBuilder,
    private location: Location,
    private clasificacionService: ClasificacionService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService:LogsService,
    private usuarioService:UsuariosService) {
          //Formulario
  this.datosClasificacion = this.fb.group({
    nombre: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40) , Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    img: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(70) ]],
    partidosJugados: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^[0-9]{1,3}$/) ]],
    partidosGanados: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^(?=.*[1-9])[0-9]{1,3}$/)]],
    partidosEmpatados: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^(?=.*[1-9])[0-9]{1,3}$/)]],
    partidosPerdidos: ['', [Validators.required , Validators.minLength(1) ,  Validators.pattern(/^(?=.*[1-9])[0-9]{1,3}$/)]],
    golesFavor: ['', [Validators.required , Validators.minLength(1) ,  Validators.pattern(/^(?=.*[1-9])[0-9]{1,3}$/)]], 
    golesContra: ['', [Validators.required , Validators.minLength(1) ,  Validators.pattern(/^(?=.*[1-9])[0-9]{1,3}$/)]],
    puntos: ['', [Validators.required , Validators.minLength(1) ,  Validators.pattern(/^(?=.*[1-9])[0-9]{1,3}$/)]],
    
  });
     }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
    this.logService.addLog("Entramos en el formulario crear clasificiado","Estamos en el componente clasificacion");
    console.log('hola soy formulario de equipo');
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.clasificacionService.conexion(this.documentId).subscribe(
          (resp: any) => {
            this.datosClasificacion.setValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })


  }



  get nombreNoValido(){
    return this.datosClasificacion.get('nombre')?.invalid && this.datosClasificacion.get('nombre')?.touched;
  }

  get imgNoValido(){
    return this.datosClasificacion.get('img')?.invalid && this.datosClasificacion.get('img')?.touched;
  }
  get partidosJugadosNoValido(){
    return this.datosClasificacion.get('partidosJugados')?.invalid && this.datosClasificacion.get('partidosJugados')?.touched;
  }
  get partidosGanadosNoValido(){
    return this.datosClasificacion.get('partidosGanados')?.invalid && this.datosClasificacion.get('partidosGanados')?.touched;
  }
  get partidosEmpatadosNoValido(){
    return this.datosClasificacion.get('partidosEmpatados')?.invalid && this.datosClasificacion.get('partidosEmpatados')?.touched;
  }
  get partidosPerdidosNoValido(){
    return this.datosClasificacion.get('partidosPerdidos')?.invalid && this.datosClasificacion.get('partidosPerdidos')?.touched;
  }
  get golesFavorNoValido(){
    return this.datosClasificacion.get('golesFavor')?.invalid && this.datosClasificacion.get('golesFavor')?.touched;
  }
  get golesContraNoValido(){
    return this.datosClasificacion.get('golesContra')?.invalid && this.datosClasificacion.get('golesContra')?.touched;
  }
  get puntosNoValido(){
    return this.datosClasificacion.get('puntos')?.invalid && this.datosClasificacion.get('puntos')?.touched;
  }


  guardar() {
    this.logService.addLog("Entramos en el metodo guardar clasificado","Estamos en el componente clasificacion");
    if (this.datosClasificacion.valid) {
      if (this.nueva) {
        console.log('hola');
        this.clasificacionService.createClasificacion(this.datosClasificacion.value).then(
          () => {
            alert('Equipo creado, enhorabuena');
            this.cancel();
          }, (error: any) => {
            alert("Error: " + error);
            this.logService.addLog(error,"Estamos en el componente clasificacion");
          }
        )
      }
    } else {
      alert('Por favor, complete correctamente todos los campos del formulario');
    }
  }

  volver(){
    this.router.navigate(['/clasificacion']);
  }

  cancel() {
    this.location.back();
  }

}
