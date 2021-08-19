import { FileuploadService } from './../../../../services/fileupload.service';
import { LocationService } from 'src/app/services/location.service';
import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { Empresa } from 'src/app/models/EmpresaModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styles: [
  ]
})
export class NuevaEmpresaComponent implements OnInit {
  pais: any[];
  files: any[];
  empresa: Empresa = new Empresa();

  constructor(private router: Router, private empreServi: EmpreServicesService,
    private locaServi: LocationService, private uploadService: FileuploadService) { }

  ngOnInit(): void {
    this.locaServi.retornaPais().subscribe(resp => { this.pais = resp; });
  }


  cancelar() {
    this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
  }

  guardar() {
    console.log(this.empresa);
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
      form.append('ruc', this.empresa.ruc);
      this.uploadService.subirImagen(form).subscribe(resp => {
        if (resp['status']) {
          localStorage.setItem('logo_route', resp['generatedName']);//NO HAY ARCHIVOS
          this.empresa.logo_route =  resp['generatedName'];
        } else {
          Swal.close();
          Swal.fire({title: 'Error!',icon: 'error',text: resp['msg']});
          return;
        }
      });
    } else {
      localStorage.setItem('logo_route', '');//NO HAY ARCHIVOS
      this.empresa.logo_route = '';
    }
    /** */
    //console.log(this.empresa);//return;
    setTimeout(() => {
      this.empreServi.guardarEmpresa(this.empresa).subscribe(resp => {
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


  seleccionarArchivo(event) {
    this.files = event.target.files;
  }



}
