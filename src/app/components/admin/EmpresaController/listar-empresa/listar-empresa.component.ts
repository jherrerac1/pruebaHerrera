import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/EmpresaModel';
import { map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}


@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styles: [
  ]
})
export class ListarEmpresaComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  empresas: Empresa[];
  dtTrigger: Subject<Empresa> = new Subject();

  constructor( private empreServi: EmpreServicesService, private router: Router ) { }

  ngOnInit(): void {
    this.ListarEmpresa();
  }

  ListarEmpresa(){
    /*console.log(' Consultando Empresas registradas');*/
    this.empreServi.listarEmpresa().subscribe(data => {
      // console.log(data);
      this.empresas = data;
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }

  editarEmpresa(empresa: Empresa){
    localStorage.setItem('idEmpresa', empresa.id_empresa.toString());
    this.router.navigateByUrl('/SX-CONSOLE/admin/editarEmpresa');
  }

  nuevaEmpresa(){
    this.router.navigateByUrl('/SX-CONSOLE/admin/nuevaEmpresa');
  }

}
