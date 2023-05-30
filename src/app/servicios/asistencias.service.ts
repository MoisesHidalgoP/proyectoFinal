import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  conexion: any = this.firebase.collection('asistencias');

  constructor(private firebase: AngularFirestore) { }




  //Metodo que recoge todos los goleadores
  getAll() {
    return this.conexion.snapshotChanges();
  }
  //Metodo que ordena a los asistentes de mayor goleador a menor
  getAsistente() {
    return this.firebase.collection('asistencias', ref => ref.orderBy('asistencia', 'desc')).snapshotChanges();
  }

  //Metodo que recoge un asistente
  getAsistente1(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  

  //Metodo que crea un goleador 
  createAsistente(data: any) {
    return this.conexion.add(data);
  }

  //Metodo que actualiza un goleador 
  updateAsistente(coleccion: string, documentId: string, data: any) {
    return this.firebase.collection(coleccion).doc(documentId).update(data);
  }


  //Metodo que borra un goleador
  deleteAsistente(documentId: string){
    return this.conexion.doc(documentId).delete();
  }
  
  deleteAsistenteById(documentId: any) {
    return this.firebase.collection('asistencias').doc(documentId.toString()).delete();
  }
}
