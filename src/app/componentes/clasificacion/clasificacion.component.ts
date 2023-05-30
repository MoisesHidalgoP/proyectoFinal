import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasificacionService } from 'src/app/servicios/clasificacion.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
  listaClasificacion: any[] = [];
  contador = 1;
  rol!: string;

  constructor(private clasificacionService: ClasificacionService,
    private location: Location,
    private router: Router,
    private usuarioService:UsuariosService,
    private logService: LogsService
    ) { }

  ngOnInit(): void {
    this.getAll();
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
  }

  getAll(){ 
    this.logService.addLog("Entramos el metodo getAll","Estamos en el componente clasificacion");
    this.clasificacionService.getClasificacion().subscribe((clasificacionSnapshot: any) => {
      clasificacionSnapshot.forEach((clasificacionData:any) => {

        this.listaClasificacion.push({
          id: clasificacionData.payload.doc.id, 
          data: clasificacionData.payload.doc.data()
        });
        
      });
      
    })
  }


  borrarClasificado(documentId:string){
    this.logService.addLog("Entramos en el metodo borrarClasificado","Estamos en el componente clasificacion");
    console.log(documentId);
    if (confirm('¿Estás seguro de que deseas borrar este equipo?')) {
    this.clasificacionService.deleteEquipoById(documentId)
      .then(() => {
        alert('Equipo borrado, enhorabuena');
        this.cancel();
      })
      .catch((error: any) => {
        console.error(error);
        alert('Ha ocurrido un error al borrar el equipo');
        this.logService.addLog(error,"Estamos en el componente clasificacion");
      });
  }
}


  editarClasificado(documentId: string) {
    this.router.navigate(['/editarClasificacion', documentId]);
  }

  cancel() {
    this.location.back();
  }

  volver(){
    this.router.navigate(['/main']);
  }

}
