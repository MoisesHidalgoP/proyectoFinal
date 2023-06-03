import { Component, OnInit } from '@angular/core';
import { GoleadoresService } from '../../servicios/goleadores.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LogsService } from 'src/app/servicios/logs.service';

@Component({
  selector: 'app-goleadores',
  templateUrl: './goleadores.component.html',
  styleUrls: ['./goleadores.component.css']
})
export class GoleadoresComponent implements OnInit {
  listaGoleadores: any[] = [];
  contador = 1;
  rol!: string;

  constructor(private goleadoresService: GoleadoresService,
    private router: Router,
    private usuarioService:UsuariosService,
    private location: Location,
    private logService:LogsService) { }

  ngOnInit(): void {
    this.getAll();
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
    
  }

  getAll(){ 
    this.logService.addLog("Entramos en metodo getAll","Estamos en el componente goleadores");
    this.goleadoresService.getGoleadores().subscribe((goleadoresSnapshot: any) => {
      goleadoresSnapshot.forEach((goleadoresData:any) => {

        this.listaGoleadores.push({
          id: goleadoresData.payload.doc.id, 
          data: goleadoresData.payload.doc.data()
        });
        
      });
      
    })
  }

  borrarGoleador(documentId:string){
    this.logService.addLog("Entramos en el metodo borrarGoleador","Estamos en el componente goleadores");
    console.log(documentId);
    if (confirm('¿Estás seguro de que deseas borrar a este jugador?')) {
    this.goleadoresService.deleteGoleadorById(documentId)
      .then(() => {
        alert('Jugador borrado, enhorabuena');
        this.cancel();
      
      })
      .catch((error: any) => {
        console.error(error);
        alert('Ha ocurrido un error al borrar al jugador');
        this.logService.addLog(error,"Estamos en el componente goleadores");
      });
  }
}


  editarGoleador(documentId: string) {
    this.router.navigate(['/goleadores/editarGoleador', documentId]);
    console.log(documentId);
  }

  cancel() {
    this.location.back();
  }

  volver(){
    this.router.navigate(['/main']);
  }

}
