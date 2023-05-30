import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class GoleadoresService {
  conexion: any = this.firebase.collection('goleadores');

  constructor(private firebase: AngularFirestore) { }

  //Metodo que recoge todos los goleadores
  getAll() {
    return this.conexion.snapshotChanges();
  }
  //Metodo que ordena a los goleadores de mayor goleador a menor
  getGoleadores() {
    return this.firebase.collection('goleadores', ref => ref.orderBy('gol', 'desc')).snapshotChanges();
  }

  //Metodo que recoge un goleador
  getGoleador(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  //Metodo que crea un goleador 
  createGoleador(data: any) {
    return this.conexion.add(data);
  }

  //Metodo que actualiza un goleador 
  updateGoleador(coleccion: string, documentId: string, data: any) {
    return this.firebase.collection(coleccion).doc(documentId).update(data);
  }


  //Metodo que borra un goleador
  deleteGoleador(documentId: string){
    return this.conexion.doc(documentId).delete();
  }
  
  deleteGoleadorById(documentId: any) {
    return this.firebase.collection('goleadores').doc(documentId.toString()).delete();
  }

  
}
