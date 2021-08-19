import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BackEndService } from 'src/app/services/back-end.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styles: [
  ]
})



export class ListarContratosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  contratos: any[];

  constructor(private route: Router, private service: BackEndService) { }

  ngOnInit(): void {
    this.listarContratos();
    //console.log(this.contratos);
  }
  
  listarContratos(){
    this.service.retornaContratos().subscribe(data => {
      this.contratos = data;
      this.dtTrigger.next();
     });
  }

  nuevo(id_cliente: string, id_tipo:string ){
    localStorage.setItem("id_cliente",id_cliente);
    localStorage.setItem("comercio",id_tipo)
    this.route.navigateByUrl('/SX-CONSOLE/general/newContrato');
  }

  editar(cliente: any){
    localStorage.setItem('id_cliente', cliente.id_cliente.toString());
    this.route.navigateByUrl('/SX-CONSOLE/general/editContrato');
  }

}


