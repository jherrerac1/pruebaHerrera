import { FileuploadService } from 'src/app/services/fileupload.service';
import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/EmpresaModel';
import { Router } from '@angular/router';
import { EmpreServicesService } from 'src/app/services/empre-services.service';

import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { LocationModel } from 'src/app/models/LocationModel';
import { LocationService } from '../../../../services/location.service';

declare var externalObject: any;

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styles: [
  ]
})
export class EditarEmpresaComponent implements OnInit {

  empresa: Empresa = new Empresa();
  pais: any[];
  files: any[];


  constructor(private router: Router, private emprServi: EmpreServicesService, private locaServi: LocationService, private uploadService: FileuploadService) { }

  ngOnInit(): void {
    this.editar();
    this.locaServi.retornaPais().subscribe(resp => {
      this.pais = resp;
    });
  }

  editar() {
    let id = localStorage.getItem("idEmpresa");
    this.emprServi.empresaById(id).subscribe(resp => {
      this.empresa = resp;
      externalObject.provi(this.empresa.pais);
      externalObject.ciudad(this.empresa.provincia);
      externalObject.localidad(this.empresa.ciudad);
      externalObject.setProvi(this.empresa.provincia);
      externalObject.setCiu(this.empresa.ciudad);
      externalObject.setLoca(this.empresa.localidad);
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire(
      {
        title: 'info',
        text: 'Registrando Datos', allowOutsideClick: false
      }
    );
    Swal.showLoading();
    /** SUBIDA ARCHIVOS */
    if (this.files != null && this.files.length > 0) {
      let form = new FormData();
      form.append('file', this.files[0]);
      form.append('ruc', this.empresa.ruc.trim());
      form.append('ruta_2', this.empresa.logo_route.trim());
      this.uploadService.subirImagen(form).subscribe(resp => {
        if (resp['status']) {
          localStorage.setItem('logo_route', resp['generatedName'].trim());//NO HAY ARCHIVOS
          this.empresa.logo_route = resp['generatedName'].trim();
        } else {
          Swal.close();
          Swal.fire({ title: 'Error!', icon: 'error', text: resp['msg'] });
          return;
        }
      });
    } else {
      localStorage.setItem('logo_route', '');//NO HAY ARCHIVOS
      this.empresa.logo_route = '';
    }
    //console.log(this.empresa);
    /** */
    console.log(this.empresa.logo_route);//return;
    setTimeout(() => {
      this.emprServi.ActualizarEmpresa(this.empresa).subscribe(resp => {
        if (resp['error'] === false) {
          Swal.close();
          Swal.fire({
            position: 'top-end', title: 'Respuesta',
            icon: 'success', text: 'DATOS GRABADOS CON EXITO', showConfirmButton: false, timer: 1500
          });
          localStorage.removeItem('logo_route');
          this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
        } else {
          Swal.close();
          Swal.fire({ title: 'Error!', icon: 'error', text: resp['mensaje'] });
        }

      }
        , (err) => {
          Swal.close();
          Swal.fire({ title: 'Error!', icon: 'error', text: 'error de llamada' });
        }
      );
    }, 4000);


  }

  cancelar() {
    localStorage.removeItem("idEmpresa");
    this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
  }

  seleccionarArchivo(event) {
    this.files = event.target.files;
  }
}
