import { ClienteTipoModel } from './../../../../models/ClienteTipoModel';
import { LocationService } from 'src/app/services/location.service';
import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { BackEndService } from 'src/app/services/back-end.service';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { LocationModel } from 'src/app/models/LocationModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import '../../../../../assets/libs/js/general.js';

import Swal from 'sweetalert2';
// import { FileuploadService } from 'src/app/services/fileupload.service';
import { FileuploadService } from './../../../../services/fileupload.service';

declare var externalObject: any;

@Component({
  selector: 'app-edit-clientes',
  templateUrl: './edit-clientes.component.html',
  styles: [
  ]
})

export class EditClientesComponent implements OnInit {
  cliente: ClienteModel = new ClienteModel();
  pais: any[];
  provincia: LocationModel[];
  localidad: LocationModel[];
  ciudad: LocationModel[];
  tipoCliente: ClienteTipoModel = new ClienteTipoModel();
  tipos: any[];
  mensaje: string;
  files: any[];
  // Interfaz
  archivo = { nombre: null, nombreArchivo: null, base64textString: null }

  constructor(private route: Router,
    private service: BackEndService, private empservi: EmpreServicesService,
    private locservi: LocationService, private uploadService: FileuploadService) { }

  ngOnInit(): void {
    this.locservi.retornaPais().subscribe(data => { this.pais = data; });
    this.service.listarTiposClientes().subscribe(data => { this.tipos = data; });
    this.editar();
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
    //return;
    setTimeout(() => {
      this.service.actualizarCliente(this.cliente).subscribe(resp => {
        Swal.close();
        if (resp['error']) {
          Swal.fire({
            title: 'Error!', icon: 'error', text: resp['mensaje'], showConfirmButton: false, timer: 1500, position: 'top-end'
          });
        } else {
          Swal.fire({
            position: 'top-end', title: 'Respuesta', icon: 'success', text: 'DATOS GRABADOS CON EXITO', showConfirmButton: false, timer: 1500
          });
          localStorage.removeItem('doc_route');
          this.route.navigateByUrl('/SX-CONSOLE/general/clientes');
        }
      }, (err) => {
        Swal.close();
        Swal.fire({ title: 'Error!', icon: 'error', text: 'ERROR LLAMADA' });
      });
    }, 5000);



  }

  cancelar() {
    this.route.navigateByUrl('/SX-CONSOLE/general/clientes');
  }


  editar() {
    this.service.CLienteID(localStorage.getItem('id_cliente')).subscribe(data => {
      this.cliente.id_cliente = data['id_cliente'];
      this.empservi.empresaById(data['id_empresa']).subscribe(resp => {
        this.cliente.id_empresa = resp;
      });
      this.cliente.apellido = data['apellido'];
      this.cliente.nombre = data['nombre'];
      this.cliente.dni = data['dni'];
      this.cliente.cod_clt = data['cod_clt'];
      this.cliente.direccion = data['direccion'];
      this.cliente.referencia = data['referencia'];
      this.cliente.coordenadas = data['coordenadas'];
      this.cliente.mail = data['mail'];
      this.cliente.pais = data['pais'];
      externalObject.provi(data['pais']);
      this.cliente.provincia = data['provincia'];
      externalObject.setProvi(data['provincia']);
      externalObject.ciudad(data['provincia']);
      this.cliente.ciudad = data['ciudad'];
      externalObject.setCiu(data['ciudad']);
      externalObject.localidad(data['ciudad']);
      this.cliente.localidad = data['localidad'];
      externalObject.setLoca(data['localidad']);
      // this.tipoCliente = data['id_tipo'];
      this.service.ClientetipoClienteID(data['id_tipo']).subscribe(resp => {
        this.cliente.idTipo = resp;
      });
      externalObject.setTipo(data['id_tipo']);
      this.cliente.estado = data['estado'];
      this.cliente.discapacidad = data['discapacidad'];
      // this.cliente.idTipo.idTipo = data['id_tipo'];
      this.cliente.telef = data['telef'];
      this.cliente.telef_adic = data['telef_adic'];
    });
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






  //////////////////////////////////////////////

}
