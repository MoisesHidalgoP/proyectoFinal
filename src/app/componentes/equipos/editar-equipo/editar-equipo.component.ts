import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css']
})
export class EditarEquipoComponent implements OnInit {

  datosEquipo!:FormGroup;
  rol!: string;

  documentId: any;
  coleccion:any;
  nueva: boolean = false;
  dataEquipo: any;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private equipoService: EquiposService,
    private ruta: ActivatedRoute,
    private router: Router,
    private logService: LogsService,
    private usuarioService : UsuariosService
  ) {
     //Formulario
  this.datosEquipo = this.fb.group({
    nombre: [{ value: '', disabled: true }, [Validators.required , Validators.minLength(5) , Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/) ]],
    img: ['', [Validators.required , Validators.minLength(5) , Validators.maxLength(70) , ]],
    entrenador: ['', [Validators.required , Validators.minLength(5) ,  Validators.maxLength(40),  Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    estadio: ['', [Validators.required , Validators.minLength(5) ,  Validators.maxLength(40) ,  Validators.pattern(/^[a-zA-Z\s\u00C0-\u017F]*$/)]],
    anio: ['', [Validators.required , Validators.minLength(4) , Validators.pattern(/^\d{4,6}$/)]],
    numSocio: ['', [Validators.required , Validators.minLength(4) ,  Validators.pattern(/^\d{4,7}$/)  ]]
  });
   }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
    this.logService.addLog("Entramos en editar un equipo","Estamos en el componente editar equipos");

    this.ruta.params.subscribe( params => {
      if(params['id']){
        this.documentId = String(params['id']);
        this.nueva = false;
        console.log('editar');
    
        this.equipoService.getEquipo1(this.documentId).subscribe(
          (resp: any) => {
            this.datosEquipo.patchValue(resp.payload.data());
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



  actualizarEstado(){
    this.logService.addLog("Entramos en el metodo actualizar un equipo","Estamos en el componente editar equipos");
    this.dataEquipo = this.datosEquipo.value;

    if (this.datosEquipo.valid) {
      console.log("Estas entrado por aqui");
      this.equipoService.updatEquipo("equipos",this.documentId, this.dataEquipo).then(
        () => {
          alert("Registro actualizado");
          this.router.navigate(['/equipos']);
        },
        (error: any) => {
          alert("¡A ocurrido un error!");
          console.log(error);
          this.logService.addLog(error,"Estamos en el componente editar equipos");
        }
      );
  
    }else{
      this.dataEquipo.reset();
      alert("Complete los campos");
    }
  }

  volver(){
    this.router.navigate(['/equipos']);
  }

}
