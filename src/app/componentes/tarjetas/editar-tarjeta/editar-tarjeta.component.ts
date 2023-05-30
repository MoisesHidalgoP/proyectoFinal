import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { TarjetasService } from 'src/app/servicios/tarjetas.service';

@Component({
  selector: 'app-editar-tarjeta',
  templateUrl: './editar-tarjeta.component.html',
  styleUrls: ['./editar-tarjeta.component.css']
})
export class EditarTarjetaComponent implements OnInit {
  datosTarjeta!:FormGroup;
  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataTarjeta: any;

  constructor(private fb: FormBuilder,
    private location: Location,
    private tarjetasService: TarjetasService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService : LogsService) 
    { 
       //Formulario
  this.datosTarjeta = this.fb.group({
    nombre: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    equipo: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    tarjetasAmarillas: ['', [Validators.required , Validators.minLength(1) ,Validators.pattern(/^(?:[0-9]|[1-9]\d|100)$/)]],
    tarjetasRojas: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^(?:[0-9]|[1-9]\d|100)$/)]],
    totalTarjetas: ['', [Validators.required , Validators.minLength(1) , Validators.pattern(/^(?:0|[1-9]\d{0,1}|1\d{2}|200)$/)]]
   
    
  });
    }

  ngOnInit(): void {
    this.logService.addLog("Entramos en el formulario editar jugador con tarjeta","Estamos en el componente tarjetas");
    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
        // mostrar la incidencia en el formulario
        this.tarjetasService.getTarjeta1(this.documentId).subscribe(
          (resp: any) => {
            this.datosTarjeta.patchValue(resp.payload.data());
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


  actualizarEstado(){
    this.logService.addLog("Entramos en metodo actualizar jugador con tarjeta","Estamos en el componente tarjetas");
    this.dataTarjeta = this.datosTarjeta.value;

    if (this.datosTarjeta.valid) {
      console.log("Estas entrado por aqui");
      this.tarjetasService.updateTarjeta("tarjetas",this.documentId, this.dataTarjeta).then(
        () => {
          alert("Registro actualizado");
          this.router.navigate(['/tarjetas']);
        },
        (error: any) => {
          alert("¡A ocurrido un error!");
          console.log(error);
          this.logService.addLog(error,"Estamos en el componente tarjetas");
        }
      );
  
    }else{
      this.dataTarjeta.reset();
      alert("Complete los campos");
    }
  }


  

  volver(){
    this.router.navigate(['/tarjetas']);
  }

}
