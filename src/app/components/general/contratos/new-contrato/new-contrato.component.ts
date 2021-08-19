import { ClienteModel } from './../../../../models/ClienteModel';
import { BackEndService } from './../../../../services/back-end.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


import Swal from 'sweetalert2';
import { ContratoModel } from 'src/app/models/ContratoModel';

import { FilePdfService } from 'src/app/services/file-pdf.service';
import '../../../../../assets/libs/js/general.js';
declare var externalObject: any;
@Component({
  selector: 'app-new-contrato',
  templateUrl: './new-contrato.component.html',
  styles: [
  ]
})


export class NewContratoComponent implements OnInit {
  contrato: ContratoModel = new ContratoModel();
  planes: any[];
  constructor(private route: Router, private service: BackEndService, private pdf: FilePdfService) { }
  cliente: ClienteModel = new ClienteModel();

  /*equiCompra:any;
  equiArriendo: any;
  val_equipoC:number;*/
  Equipos: datosequipos = new datosequipos();
  //cliente: any;
  ngOnInit(): void {
    externalObject.setMarcas('cmb_marca1', 'A');
    externalObject.setMarcas('cmb_marca2', 'C');
    this.service.CLienteID(localStorage.getItem('id_cliente')).subscribe(resp => {
      this.cliente.apellido = resp['apellido'];
      this.cliente.nombre = resp['nombre'];
      this.cliente.id_cliente = resp['id_cliente'];
      //console.log(resp);
      this.contrato.id_cliente = this.cliente.id_cliente;
      //this.cliente
    });
    this.service.retornaPlanes(localStorage.getItem('comercio')).subscribe(resp => {
      //console.log(resp);
      this.planes = resp;
    });

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log(form);
      console.log("ERROR FORM");
      return;
    }
    Swal.fire({ title: 'info', text: 'Registrando Datos', allowOutsideClick: false });
    Swal.showLoading();
    console.log(this.contrato);
    console.log(this.Equipos);
    //return;
    this.service.grabarContrato(this.contrato, this.Equipos).subscribe(resp => {
      if (resp['error'] == false) {
        Swal.close();
        Swal.fire({
          position: 'top-end', title: 'Respuesta',
          icon: 'success', text: 'DATOS GRABADOS CON EXITO', showConfirmButton: false, timer: 1500
        });
        localStorage.removeItem('id_cliente');
        localStorage.removeItem('comercio');
        this.route.navigateByUrl('SX-CONSOLE/general/listContratos');
      } else {
        Swal.close();
        Swal.fire({ title: 'Error!', icon: 'error', text: resp['respuesta'] });
      }

    }, (err) => {
      Swal.close();
      Swal.fire({ title: 'Error!', icon: 'error', text: 'error al grabar' });
    });
  }

  cancelar() {
    localStorage.removeItem('id_cliente');
    localStorage.removeItem('comercio');
    this.route.navigateByUrl('SX-CONSOLE/general/listContratos');
  }

  buscarPlanId(e: any) {
    //console.log(e.target.value);
    this.service.consultaPlanId(e.target.value).subscribe(resp => {
      this.contrato.id_plan = resp['id_plan'];
      (<HTMLInputElement>document.getElementById("val_install")).value = resp['val_install'];
    });
  }

  EquipoArr(e: any) {
    this.Equipos.equiArriendo = e.target.value;
    console.log(this.Equipos.equiArriendo = e.target.value);
  }
  valorEquipo(e: any) {

    (<HTMLInputElement>document.getElementById("val_equipo")).value = '';

    this.Equipos.equiCompra = e.target.value;
    this.service.consultaEquipoId(this.Equipos.equiCompra.toString()).subscribe(resp => {
      (<HTMLInputElement>document.getElementById("val_equipo")).value = resp['val_equipo'];
      this.Equipos.val_equipoC = resp['val_equipo'];
    });
  }



}


export class datosequipos {
  equiCompra: number;
  equiArriendo: number;
  val_equipoC: number;
}