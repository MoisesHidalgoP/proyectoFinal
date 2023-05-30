import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  conexion: any = this.firebase.collection('equipos');

  constructor(private firebase: AngularFirestore) { }

  //Metodo que recoge todos los equipos
  getAll() {
    return this.conexion.snapshotChanges();
  }

  //Metodo que crea un equipo
  creatEquipo(data: any) {
    return this.conexion.add(data);
  }

  getEquipo() {
    return this.firebase.collection('equipos', ref => ref.where('nombre', '==', 'Real Betis Balompié')).snapshotChanges();
  }
  getEquipo1(documentId: string) {
    return this.conexion.doc(documentId).snapshotChanges();
  }

  //Metodo que actualiza un equipo
  updatEquipo(coleccion: string, documentId: string, data: any) {
    return this.firebase.collection(coleccion).doc(documentId).update(data);
  }


  //Metodo que borra un equipo
  deletEquipo(documentId: String){
    return this.conexion.doc(documentId).delete();
  }


  deleteEquipoById(documentId: any) {
    return this.firebase.collection('equipos').doc(documentId.toString()).delete();
  }
  

}
