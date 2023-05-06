import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getEmpleados()
  }

  getEmpleados() {
    this._empleadoService.getClients().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  deleteClient(id: string) {
    this._empleadoService.eliminateClient(id).then(() => {
      console.log('empelado eliminado con exito');
      this.toastr.error('Client details deleted successfully!', 'Client Removed!', {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error => {
      console.log(error);
    })
  }

}
