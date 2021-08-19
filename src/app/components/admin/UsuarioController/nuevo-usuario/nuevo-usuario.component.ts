import { Empresa } from 'src/app/models/EmpresaModel';
import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { Router } from '@angular/router';
import { BackEndService } from 'src/app/services/back-end.service';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styles: [
  ]
})
export class NuevoUsuarioComponent implements OnInit {
  empresas: Empresa[];
  usuario: UsuarioModel = new UsuarioModel();
  constructor(private router: Router, private service: BackEndService, private empreSer: EmpreServicesService) { }

  ngOnInit(): void {
    this.empreSer.listarEmpresa().subscribe(resp => {
      this.empresas = resp;
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
    this.service.guardarUsuario(this.usuario).subscribe(data => {
      Swal.close();
      if (!data['error']) {
        Swal.fire({
          position: 'top-end',
          title: 'Respuesta',
          icon: 'success',
          text: 'DATOS GRABADOS CON EXITO',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl('/SX-CONSOLE/admin/usuarios');
      } else {
        Swal.fire({title: 'Error!',icon: 'error',text: 'ERROR EN LLAMADA DE SERVICIO'});
      }

    }, (err) => {
      Swal.close();
      Swal.fire({title: 'Error!',icon: 'error',text: 'ERROR EN LLAMADA DE SERVICIO'});
    });

  }

  cancelar() {
    this.router.navigateByUrl('/SX-CONSOLE/admin/usuarios');
  }

}
