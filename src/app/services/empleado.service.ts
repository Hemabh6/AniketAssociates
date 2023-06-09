import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private firestore: AngularFirestore) { }

  agregarEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados').add(empleado);
  }

  getClients(): Observable<any> {
    return this.firestore.collection('empleados', ref => ref.orderBy('business', 'asc')).snapshotChanges();
  }

  eliminateClient(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getClient(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  actualizarEmpleado(id: string, data:any): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update(data);
  }

}
