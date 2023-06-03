import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogsService } from 'src/app/servicios/logs.service';
import { TarjetasService } from 'src/app/servicios/tarjetas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {
  listaTarjetas: any[] = [];
  contador = 1;
  rol!: string;

  constructor(private tarjetasService: TarjetasService,
    private router: Router,
    private usuarioService:UsuariosService,
    private location: Location,
    private logService: LogsService) { }

  ngOnInit(): void {
    this.getAll();
    this.rol = localStorage.getItem('rol') || this.usuarioService.rol;
  }


  getAll(){ 
    this.logService.addLog("Entramos en metodo getAll","Estamos en el componente tarjetas");
    this.tarjetasService.getTarjeta().subscribe((tarjetaSnapshot: any) => {
      tarjetaSnapshot.forEach((tarjetaData:any) => {

        this.listaTarjetas.push({
          id: tarjetaData.payload.doc.id, 
          data: tarjetaData.payload.doc.data()
        });
        
      });
      
    })
  }

  borrarTarjeta(documentId:string){
    this.logService.addLog("Entramos en el metodo borrar tajeta","Estamos en el componente tarjetas");
    console.log(documentId);
    if (confirm('¿Estás seguro de que deseas borrar a este jugador?')) {
    this.tarjetasService.deleteTarjetaById(documentId)
      .then(() => {
        alert('Jugador borrado, enhorabuena');
        this.cancel();
       
        
      })
      .catch((error: any) => {
        console.error(error);
        alert('Ha ocurrido un error al borrar al jugador');
        this.logService.addLog(error,"Estamos en el componente tarjetas");
      });
  }
}


  editarTarjeta(documentId: string) {
    this.router.navigate(['/tarjetas/editarTarjeta', documentId]);
    console.log(documentId);
  }

  cancel() {
    this.location.back();
  }

  volver(){
    this.router.navigate(['/main']);
  }


}
