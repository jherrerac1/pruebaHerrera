import { FileuploadService } from 'src/app/services/fileupload.service';
import { LocationModel } from 'src/app/models/LocationModel';
import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { BackEndService } from 'src/app/services/back-end.service';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { LocationService } from 'src/app/services/location.service';
import { ClienteTipoModel } from 'src/app/models/ClienteTipoModel';

import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styles: [
  ]
})
export class AddClientesComponent implements OnInit {
  cliente: ClienteModel = new ClienteModel();
  pais: any[];
  provincia: LocationModel[];
  localidad: LocationModel[];
  ciudad: LocationModel[];
  tipoCliente: ClienteTipoModel = new ClienteTipoModel();
  tipos: any[];
  files: any[];

  constructor(private route: Router,
    private service: BackEndService, private empservi: EmpreServicesService, private locservi: LocationService, private uploadService: FileuploadService) { }

  ngOnInit(): void {
    this.empservi.empresaById(localStorage.getItem('id_empresa')).subscribe(
      data => {
        this.cliente.id_empresa = data;
      });

    this.locservi.retornaPais().subscribe(data => { this.pais = data; });
    this.service.listarTiposClientes().subscribe(data => { this.tipos = data; });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;

    }
    Swal.fire({ title: 'info', text: 'Registrando Datos', allowOutsideClick: false });
    Swal.showLoading();
    /**SUBIR ARCHIVOS */
    if (this.files != null && this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        let form = new FormData();
        form.append('file', this.files[i]);
        form.append('dni', this.cliente.dni);
        this.uploadService.subirImagenCliente(form).subscribe(resp => {
          if (resp['status']) {
            localStorage.setItem('doc_route', resp['path']);//NO HAY ARCHIVOS
            this.cliente.doc = resp['path'];
          } else {
            Swal.close();
            Swal.fire({ title: 'Error!', icon: 'error', text: resp['msg'] });
            return;
          }
        });
      }
    } else {
      localStorage.setItem('doc_route', '');//NO HAY ARCHIVOS
      this.cliente.doc = '';
    }
    /** */

    setTimeout(() => {
      this.service.guardarCliente(this.cliente).subscribe(resp => {
        Swal.close();
        if (resp['error']) {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: resp['mensaje'],
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end'
          });
        } else {
          Swal.fire({
            position: 'top-end',
            title: 'Respuesta',
            icon: 'success',
            text: 'DATOS GRABADOS CON EXITO',
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.removeItem('doc_route');
          this.route.navigateByUrl('/SX-CONSOLE/general/clientes');
        }


      }, (err) => {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: err.error.error.message
        });
      });
    }, 5000);


  }

  cancelar() {
    this.route.navigateByUrl('/SX-CONSOLE/general/clientes');
  }



  asiganrTipo(event: any) {
    this.service.ClientetipoClienteID(event.target.value).subscribe(resp => {
      this.cliente.idTipo = resp;
    });
  }

  ////////////////////////////////////////////////
  seleccionarArchivo(event) {
    this.files = event.target.files;
  }

}

