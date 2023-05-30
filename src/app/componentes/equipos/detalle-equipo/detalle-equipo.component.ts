import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { LogsService } from 'src/app/servicios/logs.service';

@Component({
  selector: 'app-detalle-equipo',
  templateUrl: './detalle-equipo.component.html',
  styleUrls: ['./detalle-equipo.component.css']
})
export class DetalleEquipoComponent implements OnInit {

 datosEquipo!:FormGroup;

  nueva: boolean = false;
  documentId: any;
  coleccion:any;
  equipo: any;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private equipoService: EquiposService,
    private ruta: ActivatedRoute,
    private logService: LogsService
  ) {

     //Formulario
  this.datosEquipo = this.fb.group({
    nombre: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/) ]],
    img: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(70) ]],
    entrenador: ['', [Validators.required , Validators.minLength(5) ,  Validators.maxLength(40),  Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    estadio: ['', [Validators.required , Validators.minLength(5) ,  Validators.maxLength(40) ,  Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    anio: ['', [Validators.required , Validators.minLength(4) , Validators.pattern(/^\d{4,6}$/)]],
    numSocio: ['', [Validators.required , Validators.minLength(4) ,  Validators.pattern(/^\d{4,7}$/)  ]]
  });
   }

  ngOnInit(): void {
    this.logService.addLog("Entramos en crear equipo","Estamos en el componente crear equipos");
    console.log('hola soy formulario de equipo');
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.equipoService.conexion(this.documentId).subscribe(
          (resp: any) => {
            this.datosEquipo.setValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })
  }

  get nombreNoValido(){
    return this.datosEquipo.get('nombre')?.invalid && this.datosEquipo.get('nombre')?.touched;
  }
  
  get imgNoValido(){
    return this.datosEquipo.get('img')?.invalid && this.datosEquipo.get('img')?.touched;
  }
  get entrenadorNoValido(){
    return this.datosEquipo.get('entrenador')?.invalid && this.datosEquipo.get('entrenador')?.touched;
  }
  get estadioNoValido(){
    return this.datosEquipo.get('estadio')?.invalid && this.datosEquipo.get('estadio')?.touched;
  }
  get anioNoValido(){
    return this.datosEquipo.get('anio')?.invalid && this.datosEquipo.get('anio')?.touched;
  }
  get numSocioNoValido(){
    return this.datosEquipo.get('numSocio')?.invalid && this.datosEquipo.get('numSocio')?.touched;
  }



  guardar() {
    this.logService.addLog("Guardamos el nuevo equipo","Estamos en el componente crear equipos");
    if (this.datosEquipo.valid) {
      if (this.nueva) {
        // guardar datos con createIncidencia
        this.equipoService.creatEquipo(this.datosEquipo.value).then(
          () => {
            alert('Equipo creado, enhorabuena');
            this.cancel();
          }, (error: any) => {
            alert("Error: " + error);
          }
        )
      }
    } else {
      alert('Por favor, complete correctamente todos los campos del formulario');
    }
  }
  

    cargarDatosEquipo() {
    
      this.datosEquipo.patchValue({
        nombre: this.equipo.nombre,
        img: this.equipo.img,
        entrenador: this.equipo.entrenador,
        estadio: this.equipo.estadio,
        anio: this.equipo.anio,
        numSocio: this.equipo.numSocio
      });
    }
    
    
    cancel() {
      this.location.back();
    }


    limpiar(){
      return this.datosEquipo.reset();
    }


}
