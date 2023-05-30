import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
conexion: any = this.firebase.collection('clasificacion');

  constructor(private firebase: AngularFirestore) { }

   //Metodo que recoge todos los clasificacos(equipos)
   getAll() {
    return this.conexion.snapshotChanges();
  }
  //Metodo que ordena a los equipos de mayor puntos a menor
  getClasificacion() {
    return this.firebase.collection('clasificacion', ref => ref.orderBy('puntos', 'desc')).snapshotChanges();
  }

  getClasificacion1(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  //Metodo que recoge un clasificado(equipo)
  getClasificado(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  //Metodo que crea un equipo
  createClasificacion(data: any) {
    return this.conexion.add(data);
  }

  //Metodo que actualiza un equipo
  updateClasificacion(coleccion: string, documentId: string, data: any) {
    return this.firebase.collection(coleccion).doc(documentId).update(data);
  }


  //Metodo que borra un clasificaco(equipo)
  deleteClasificacion(documentId: string){
    return this.conexion.doc(documentId).delete();
  }

  deleteEquipoById(documentId: any) {
    return this.firebase.collection('clasificacion').doc(documentId.toString()).delete();
  }
  

}
