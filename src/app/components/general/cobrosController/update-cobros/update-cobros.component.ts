import { BackEndService } from 'src/app/services/back-end.service';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { Component, OnInit } from '@angular/core';
import { CobrosModel } from 'src/app/models/CobrosModel';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import '../../../../../assets/libs/js/general.js';

import Swal from 'sweetalert2';
import { FileuploadService } from './../../../../services/fileupload.service';
declare var externalObject: any;
@Component({
  selector: 'app-update-cobros',
  templateUrl: './update-cobros.component.html',
  styles: [
  ]
})
export class UpdateCobrosComponent implements OnInit {
  cobro: CobrosModel = new CobrosModel();
  clientes: ClienteModel[];
  files: any[];
  constructor(private route: Router, private service: BackEndService, private uploadService: FileuploadService) { }

  ngOnInit(): void {
    this.service.listarClientes().subscribe(resp => { this.clientes = resp; });
    this.editar();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(this.cobro);
    if (this.cobro.valor_pagado == this.cobro.valor) {
      this.cobro.estatus = 'PAGO TOTAL';
    }

    if (this.cobro.valor_pagado < this.cobro.valor && this.cobro.valor_pagado > 0) {
      Swal.fire({ title: 'Error!', icon: 'error', text: 'VALOR INGRESADO NO CUBRE LA TOTALIDAD DEL COBRO REGISTRADO' });
      return;
    }

    Swal.fire({ title: 'info', text: 'Registrando Datos', allowOutsideClick: false });
    Swal.showLoading();
    // SUBIDA DE ARCHIVOS
    if (this.files != null && this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        let form = new FormData();
        form.append('file', this.files[i]);
        form.append('id_cliente', this.cobro.id_cliente.toString());
        this.uploadService.subirImagenClientePago(form).subscribe(resp => {
          if (resp['status']) {
            localStorage.setItem('doc_comprobante', resp['path']);//NO HAY ARCHIVOS
            this.cobro.documento = resp['path'];
          } else {
            Swal.close();
            Swal.fire({ title: 'Error!', icon: 'error', text: resp['msg'] });
            return;
          }
        });

      }
    } else {
      localStorage.setItem('doc_comprobante', '');//NO HAY ARCHIVOS
      this.cobro.documento = '';
    }

    /**
     * {"status":true,"generatedName":"brand-kc.jpg.xhtml.png",
     * "path":"\/opt\/UPLOADS\/COMPROBANTESDEPAGO\/0928060037_HUNGRIA CHAMORRO_FELIX MANUEL\/"}
     */
    // FIN SUBIDA
    Swal.fire({ title: 'info', text: 'ACTUALIZANDO PAGO', allowOutsideClick: false });
    Swal.showLoading();
    this.service.guardarPago(this.cobro).subscribe(resp => {
      if (resp['error'] == false) {
        //alert('hola');
        Swal.close();
        Swal.fire({
          position: 'top-end',
          title: 'Respuesta',
          icon: 'success',
          text: 'PAGO GRABADO CON EXITO',
          showConfirmButton: false,
          timer: 1500
        });
        //form.reset();
        localStorage.removeItem('doc_comprobante');
        localStorage.removeItem('id_cobro');
        //alert('hola');
        this.route.navigateByUrl('/SX-CONSOLE/general/Listadocobros');
      } else {
        Swal.fire({ title: 'Error!', icon: 'error', text: resp['respuesta'] });
      }
    }, (err) => {
      Swal.fire({ title: 'Error!', icon: 'error', text: err.error.error.message });
    });
  }

  editar() {
    let id = localStorage.getItem('id_cobro');
    this.service.consultaCobroID(id).subscribe(
      resp => {
        this.cobro = resp;
        console.log(this.cobro.concepto);
        externalObject.setConcepto(this.cobro.concepto.trim());
      }
    );
  }

  cancelar() {
    localStorage.removeItem('id_cobro');
    this.route.navigateByUrl('/SX-CONSOLE/general/Listadocobros');
  }

  ////////////////////////////////////////////////
  seleccionarArchivo(event) {
    this.files = event.target.files;
  }

}
