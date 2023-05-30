import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciasService } from 'src/app/servicios/asistencias.service';
import { LogsService } from 'src/app/servicios/logs.service';

@Component({
  selector: 'app-nuevo-asistente',
  templateUrl: './nuevo-asistente.component.html',
  styleUrls: ['./nuevo-asistente.component.css']
})
export class NuevoAsistenteComponent implements OnInit {
  datosAsistente!:FormGroup;
  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataAsistente: any;

  constructor(private fb: FormBuilder,
    private location: Location,
    private asistenciaService: AsistenciasService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService: LogsService)
     {
      //Formulario
  this.datosAsistente = this.fb.group({
    nombre: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    equipo: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    nacionalidad: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40),Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    edad: ['', [Validators.required , Validators.minLength(1) ,Validators.pattern(/^(1[5-9]|[2-5]\d|60)$/)]],
    asistencia: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^(?:[1-9]|[1-9]\d|100)$/)]]
   
    
  });
     }

  ngOnInit(): void {
    this.logService.addLog("Entramos en el formulario crear nuevo asistente","Estamos en el componente asistencias");
    console.log('hola soy formulario de asistencias');
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.asistenciaService.conexion(this.documentId).subscribe(
          (resp: any) => {
            this.datosAsistente.setValue(resp.payload.data());
          }
        )
      }else{
        console.log('nueva');
        this.nueva=true;
      }
    })


  }


  get nombreNoValido(){
    return this.datosAsistente.get('nombre')?.invalid && this.datosAsistente.get('nombre')?.touched;
  }
  get equipoNoValido(){
    return this.datosAsistente.get('equipo')?.invalid && this.datosAsistente.get('equipo')?.touched;
  }
  get nacionalidadNoValido(){
    return this.datosAsistente.get('nacionalidad')?.invalid && this.datosAsistente.get('nacionalidad')?.touched;
  }
  get edadNoValido(){
    return this.datosAsistente.get('edad')?.invalid && this.datosAsistente.get('edad')?.touched;
  }
  get asistenciaNoValido(){
    return this.datosAsistente.get('asistencia')?.invalid && this.datosAsistente.get('asistencia')?.touched;
  }


  guardar() {
    this.logService.addLog("Entramos en el metodo guardar asistente","Estamos en el componente asistencias");
    if (this.datosAsistente.valid) {
      if (this.nueva) {
        console.log('hola');
        this.asistenciaService.createAsistente(this.datosAsistente.value).then(
          () => {
            alert('Jugador creado, enhorabuena');
            this.cancel();
          }, (error: any) => {
            alert("Error: " + error);
            this.logService.addLog(error,"Estamos en el componente asistencias");
          }
        )
      }
    } else {
      alert('Por favor, complete correctamente todos los campos del formulario');
    }
  }

  volver(){
    this.router.navigate(['/asistencias']);
  }

  cancel() {
    this.location.back();
  }



}
