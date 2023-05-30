import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  conexion: any = this.firebase.collection('usuarios');
  constructor(private firebase: AngularFirestore) { }

  addLog( message: string, className: string) {
    return this.firebase.collection('logs').add({
      message: message, 
      className: className,
      timestamp: new Date()
    });
  }

  
}
