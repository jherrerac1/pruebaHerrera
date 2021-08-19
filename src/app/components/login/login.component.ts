import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire(
      {
        title: 'info',
        text: 'Validadndo Datos', allowOutsideClick: false
      }
    );
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(resp => {
      Swal.close();
      if (!resp['error']) {
        if (resp['data']['id_perfil'] == '1') {
          this.router.navigateByUrl('/SX-CONSOLE/admin/empresas');
        } else {
          this.router.navigateByUrl('/SX-CONSOLE/general/clientes');
        }
      } else {
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: resp['mensaje']
        });
      }

    });
  }

  login() {
    console.log("HOLAAA");
  }

}
