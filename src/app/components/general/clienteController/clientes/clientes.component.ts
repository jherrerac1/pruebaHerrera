import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/models/ClienteModel';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BackEndService } from 'src/app/services/back-end.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  clientes: any[];

  constructor(private route: Router, private service: BackEndService) { }

  ngOnInit(): void {
    this.retornaClientes();
  }

  retornaClientes(){
    this.service.listarClientes().subscribe(data =>{
      // console.log(data);
      this.clientes = data;
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }

  nuevo(){
    this.route.navigateByUrl('/SX-CONSOLE/general/addClientes');
  }

  editar( id_cliente:string ){
      // console.log(cliente.id_cliente);
      localStorage.setItem('id_cliente', id_cliente);
      this.route.navigateByUrl('/SX-CONSOLE/general/editClientes');
  }

}
