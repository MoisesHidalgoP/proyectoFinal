import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {
  conexion: any = this.firebase.collection('tarjetas');

  constructor(private firebase: AngularFirestore) { }


  //Metodo que recoge todos los goleadores
  getAll() {
    return this.conexion.snapshotChanges();
  }
  //Metodo que ordena a los asistentes de mayor goleador a menor
  getTarjeta() {
    return this.firebase.collection('tarjetas', ref => ref.orderBy('totalTarjetas', 'desc')).snapshotChanges();
  }

  //Metodo que recoge un asistente
  getTarjeta1(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  

  //Metodo que crea un goleador 
  createTarjeta(data: any) {
    return this.conexion.add(data);
  }

  //Metodo que actualiza un goleador 
  updateTarjeta(coleccion: string, documentId: string, data: any) {
    return this.firebase.collection(coleccion).doc(documentId).update(data);
  }


  //Metodo que borra un goleador
  deleteTarjeta(documentId: string){
    return this.conexion.doc(documentId).delete();
  }
  
  deleteTarjetaById(documentId: any) {
    return this.firebase.collection('tarjetas').doc(documentId.toString()).delete();
  }
}
