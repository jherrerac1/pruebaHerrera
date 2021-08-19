import { ClienteModel } from 'src/app/models/ClienteModel';
import { CobrosModel } from './../../../../models/CobrosModel';
import { BackEndService } from 'src/app/services/back-end.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { data } from 'jquery';

@Component({
  selector: 'app-add-cobros',
  templateUrl: './add-cobros.component.html',
  styles: [
  ]
})
export class AddCobrosComponent implements OnInit {
  cobro: CobrosModel = new CobrosModel();
  clientes: ClienteModel[];

  constructor(private route: Router, private service: BackEndService) { }

  ngOnInit(): void {
    this.cobro.estatus ='POR PAGAR';
    this.service.listarClientes().subscribe(resp => { this.clientes = resp; });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.cobro.fecha == null) {
      Swal.fire({
        position: 'top-end',
        title: 'Error!',
        icon: 'error',
        text: 'Debe Ingresar la fecha',
        showConfirmButton: false,
        timer: 2500
      });
      return false;
    }

    console.log('SIGUE');
    Swal.fire({ title: 'info', text: 'Registrando cobro', allowOutsideClick: false });
    Swal.showLoading();
    this.service.guardarCobros(this.cobro).subscribe(resp => {
      if (resp['error'] == false) {
      Swal.close();
      Swal.fire({
        position: 'top-end',
        title: 'Respuesta',
        icon: 'success',
        text: 'DATOS GRABADOS CON EXITO',
        showConfirmButton: false,
        timer: 1500
      });
      form.reset();
      this.route.navigateByUrl('/SX-CONSOLE/general/Listadocobros');
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: resp['respuesta']
        });
      }
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        text: err.error.error.message
      });
    });
  }

  cancelar(){
    this.route.navigateByUrl('/SX-CONSOLE/general/Listadocobros');
  }

}
