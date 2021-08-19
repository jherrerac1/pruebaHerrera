import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BackEndService } from 'src/app/services/back-end.service';


class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styles: [
  ]
})
export class ListarUsuariosComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<UsuarioModel> = new Subject();
  usuarios : UsuarioModel[];


  constructor(private router: Router, private service: BackEndService) { }

  ngOnInit(): void {
    this.listarUsuario();
  }

  listarUsuario(){
    //console.log("HOLAAAA");
    this.service.listarUsuarios().subscribe(resp=>{
      //console.log(resp);
      this.usuarios = resp;
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }


  editar(usr: UsuarioModel){
    //console.log(usr.idUsuario);
    localStorage.setItem('idUsuario', usr.id_usuario.toString());
    this.router.navigateByUrl('/SX-CONSOLE/admin/editarUsuario');
  }

  nuevoUsuario(){
    this.router.navigateByUrl('/SX-CONSOLE/admin/nuevoUsuario');
  }

}
