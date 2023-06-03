import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from 'src/app/servicios/equipos.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  listaEquipos: any[] = [];
  rol!: string;
  usuarios: any[] = [];
  nombreBusqueda!: string;
  resultadosBusqueda: any[] = [];

   //Formulario
   datosEquipo = this.fb.group({
    nombre: ['', Validators.required],
    img: ['', Validators.required],
    entrenador: ['', Validators.required],
    estadio: ['', Validators.required],
    anio: ['', Validators.required],
    numSocio: ['', Validators.required]
    
  });
  

  constructor(private equipoService: EquiposService,
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private usuarioService: UsuariosService,
    private logService:LogsService) { }

  ngOnInit(): void {
    this.getAll();
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
    console.log(this.rol);
   
  }

  getAll(){
    
    this.logService.addLog("Se entra en el metodo getAll" , "Estamos en el componente equipos"); 
    
   
    this.equipoService.getAll().subscribe((incidenciasSnapshot: any) => {
      incidenciasSnapshot.forEach((incidenciaData:any) => {

        this.listaEquipos.push({
          id: incidenciaData.payload.doc.id, 
          data: incidenciaData.payload.doc.data()
        });
        
      });
    })
  }
  

  borrarEquipo(documentId: string) {
    console.log(documentId);
    this.logService.addLog("Entramos en el método borrar equipo","Estamos en el componente equipos");
    
    if (confirm('¿Estás seguro de que deseas borrar este equipo?')) {
      this.equipoService.deleteEquipoById(documentId)
        .then(() => {
          alert('Equipo borrado, enhorabuena');
          this.cancel();
        })
        .catch(error => {
          console.error(error);
          alert('Ha ocurrido un error al borrar el equipo');
         
        });
    }
  }
  

  editarEquipo(documentId: string) {
  
    this.router.navigate(['/equipos/editarEquipo', documentId]);
  }

  cancel() {
    this.location.back();
  }

  volver(){

    this.router.navigate(['/main']);
  }

  buscar() {
    if (this.nombreBusqueda) {
      // Realizar la búsqueda solo si se ha ingresado un nombre de búsqueda
      this.resultadosBusqueda = this.listaEquipos.filter((equipo: any) =>
        equipo.data.nombre.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
      );
      if (this.resultadosBusqueda.length === 0) {
        // Mostrar mensaje de error si no se encontraron resultados
        alert("No se encontraron equipos con ese nombre");
      }
    } else {
      alert("Error , inserte un equipo correcto");
    }
  }

}
