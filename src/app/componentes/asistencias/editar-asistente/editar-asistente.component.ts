import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciasService } from 'src/app/servicios/asistencias.service';
import { LogsService } from 'src/app/servicios/logs.service';

@Component({
  selector: 'app-editar-asistente',
  templateUrl: './editar-asistente.component.html',
  styleUrls: ['./editar-asistente.component.css']
})
export class EditarAsistenteComponent implements OnInit {
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
    this.logService.addLog("Entramos en el formulario de editar asistente","Estamos en el componente asistencias");

    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.asistenciaService.getAsistente1(this.documentId).subscribe(
          (resp: any) => {
            this.datosAsistente.patchValue(resp.payload.data());
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

  actualizarEstado(){
    this.logService.addLog("Entramos en el metodo actualizar un asistente","Estamos en el componente asistencias");
    this.dataAsistente = this.datosAsistente.value;

    if (this.datosAsistente.valid) {
      console.log("Estas entrado por aqui");
      this.asistenciaService.updateAsistente("asistencias",this.documentId, this.dataAsistente).then(
        () => {
          alert("Registro actualizado");
          this.router.navigate(['/asistencias']);
        },
        (error: any) => {
          alert("¡A ocurrido un error!");
          console.log(error);
          this.logService.addLog(error,"Estamos en el componente asistencias");
        }
      );
  
    }else{
      this.dataAsistente.reset();
      alert("Complete los campos");
    }
  }


  

  volver(){
    this.router.navigate(['/asistencias']);
  }


}
