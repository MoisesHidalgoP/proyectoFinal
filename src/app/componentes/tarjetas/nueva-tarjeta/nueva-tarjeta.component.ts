import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciasService } from 'src/app/servicios/asistencias.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { TarjetasService } from 'src/app/servicios/tarjetas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-nueva-tarjeta',
  templateUrl: './nueva-tarjeta.component.html',
  styleUrls: ['./nueva-tarjeta.component.css']
})
export class NuevaTarjetaComponent implements OnInit {
  datosTarjeta!:FormGroup;
  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataAsistente: any;
  rol!:string;


  constructor(private fb: FormBuilder,
    private location: Location,
    private tarjetasService: TarjetasService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService : LogsService,
    private usuarioService: UsuariosService) 
    {
      //Formulario
  this.datosTarjeta = this.fb.group({
    nombre: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    equipo: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    tarjetasAmarillas: ['', [Validators.required , Validators.minLength(0) , Validators.pattern(/^(?:[0-9]|[1-9]\d|100)$/)]],
    tarjetasRojas: ['', [Validators.required , Validators.minLength(0) , Validators.pattern(/^(?:[0-9]|[1-9]\d|100)$/)]],
    totalTarjetas: ['', [Validators.required , Validators.minLength(0) , Validators.pattern(/^(?:0|[1-9]\d{0,1}|1\d{2}|200)$/)]]
   
    
  });
     }

  ngOnInit(): void {

    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
     
    this.logService.addLog("Entramos en el formulario crear nuevo jugador con tarjeta","Estamos en el componente tarjetas");

    console.log('hola soy formulario de asistencias');
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.tarjetasService.conexion(this.documentId).subscribe(
          (resp: any) => {
            this.datosTarjeta.setValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })
  }



  get nombreNoValido(){
    return this.datosTarjeta.get('nombre')?.invalid && this.datosTarjeta.get('nombre')?.touched;
  }
  get equipoNoValido(){
    return this.datosTarjeta.get('equipo')?.invalid && this.datosTarjeta.get('equipo')?.touched;
  }
  get tarjetasAmarillasNoValido(){
    return this.datosTarjeta.get('tarjetasAmarillas')?.invalid && this.datosTarjeta.get('tarjetasAmarillas')?.touched;
  }
  get tarjetasRojasNoValido(){
    return this.datosTarjeta.get('tarjetasRojas')?.invalid && this.datosTarjeta.get('tarjetasRojas')?.touched;
  }
  get totalTarjetasNoValido(){
    return this.datosTarjeta.get('totalTarjetas')?.invalid && this.datosTarjeta.get('totalTarjetas')?.touched;
  }



  guardar() {
    this.logService.addLog("Entramos en metodo guardar nuevo jugadir con tarjeta","Estamos en el componente tarjetas");
    if (this.datosTarjeta.valid) {
      if (this.nueva) {
        console.log('hola');
        this.tarjetasService.createTarjeta(this.datosTarjeta.value).then(
          () => {
            alert('Jugador creado, enhorabuena');
            this.cancel();
          }, (error: any) => {
            alert("Error: " + error);
            this.logService.addLog(error,"Estamos en el componente tarjetas");
          }
        )
      }
    } else {
      alert('Por favor, complete correctamente todos los campos del formulario');
    }
  }

  volver(){
    this.router.navigate(['/tarjetas']);
  }

  cancel() {
    this.location.back();
  }


}
