import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Add Client';
  evcValues = [
    'EVC','DSC'
  ];

  formfreq = ['Yearly','Quarterly'];

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createEmpleado = this.fb.group({
      firmname: ['', Validators.required],
      business: ['', Validators.required],
      gst: ['', Validators.required],
      prop: ['', Validators.required],
      userId:['',Validators.required],
      userPassword:['',Validators.required],
      emailId:['',Validators.required],
      emailPass:['',Validators.required],
      frequency:['',Validators.required],
      evc:['', Validators.required],
      mobile:['',Validators.required],
      isActive:['false']
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
    console.log(this.createEmpleado)
  }

  ngOnInit(): void {
    this.isEdited();
  }

  addEditClient() {
    this.submitted = true;
    if (this.createEmpleado.invalid) {
      return;
    }

    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editClient(this.id);
    }

  }

  agregarEmpleado() {
    const empleado: any = {
      firmname: this.createEmpleado.value.firmname,
      business: this.createEmpleado.value.business,
      gst: this.createEmpleado.value.gst,
      prop: this.createEmpleado.value.prop,
      userId:this.createEmpleado.value.userId,
      userPassword:this.createEmpleado.value.userPassword,
      emailId:this.createEmpleado.value.emailId,
      emailPass:this.createEmpleado.value.emailPass,
      frequency:this.createEmpleado.value.frequency,
      evc: this.createEmpleado.value.evc,
      mobile:this.createEmpleado.value.mobile,
      isActive:this.createEmpleado.value.isActive
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(() => {
      this.toastr.success('Client was registered successfully!', 'Client Registered', {
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.router.navigate(['/list-empleados']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editClient(id: string) {
    console.log(id)
    this.titulo = 'Edit Client'
    const empleado: any = {
      firmname: this.createEmpleado.value.firmname,
      business: this.createEmpleado.value.business,
      gst: this.createEmpleado.value.gst,
      prop: this.createEmpleado.value.prop,
      userId:this.createEmpleado.value.userId,
      userPassword:this.createEmpleado.value.userPassword,
      emailId:this.createEmpleado.value.emailId,
      emailPass:this.createEmpleado.value.emailPass,
      frequency:this.createEmpleado.value.frequency,
      evc: this.createEmpleado.value.evc,
      mobile:this.createEmpleado.value.mobile
      
    }

    this.loading = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('Client information was modified successfully!', 'Updated Client information', {
        positionClass: 'toast-bottom-right'
      })
      this.router.navigate(['/list-empleados']);
    })
  }


  isEdited() {
    if (this.id !== null) {
      this.loading = true;
      this._empleadoService.getClient(this.id).subscribe(data => {
        this.loading = false;
        this.createEmpleado.setValue({
          firmname: data.payload.data()['firmname'],
          business: data.payload.data()['business'],
          gst: data.payload.data()['gst'],
          prop: data.payload.data()['prop'],
          userId: data.payload.data()['userId'],
          userPassword: data.payload.data()['userPassword'],
          emailId: data.payload.data()['emailId'],
          emailPass: data.payload.data()['emailPass'],
          frequency: data.payload.data()['frequency'],
          evc: data.payload.data()['evc'],
          mobile: data.payload.data()['mobile'],
          isActive:data.payload.data()['isActive']
        })
      })
    }
  }

}
