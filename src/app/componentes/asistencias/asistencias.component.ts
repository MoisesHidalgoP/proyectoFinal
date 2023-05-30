import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistenciasService } from 'src/app/servicios/asistencias.service';
import { LogsService } from 'src/app/servicios/logs.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  listaAsistentes: any[] = [];
  contador = 1;
  rol!: string;

  constructor(private asistenciasService: AsistenciasService,
    private router: Router,
    private usuarioService:UsuariosService,
    private location: Location,
    private logService: LogsService) { }

  ngOnInit(): void {
    this.getAll();
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
  }


  getAll(){ 
    this.logService.addLog("Entramos en metodo getAll","Estamos en el componente asistencias");
    this.asistenciasService.getAsistente().subscribe((asistenteSnapshot: any) => {
      asistenteSnapshot.forEach((asistenteData:any) => {

        this.listaAsistentes.push({
          id: asistenteData.payload.doc.id, 
          data: asistenteData.payload.doc.data()
        });
        
      });
      
    })
  }

  borrarAsistente(documentId:string){
    this.logService.addLog("Entramos en el metodo borrarAsistente","Estamos en el componente asistencias");
    console.log(documentId);
    if (confirm('¿Estás seguro de que deseas borrar a este jugador?')) {
    this.asistenciasService.deleteAsistenteById(documentId)
      .then(() => {
        alert('Jugador borrado, enhorabuena');
        this.cancel();
      
      })
      .catch((error: any) => {
        console.error(error);
        alert('Ha ocurrido un error al borrar al jugador');
        this.logService.addLog(error,"Estamos en el componente asistencias");
      });
  }
}


  editarAsistente(documentId: string) {
    this.router.navigate(['/editarAsistente', documentId]);
    console.log(documentId);
  }

  cancel() {
    this.location.back();
  }

  volver(){
    this.router.navigate(['/main']);
  }


}
