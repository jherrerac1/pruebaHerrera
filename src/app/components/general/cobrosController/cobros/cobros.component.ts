import { BackEndService } from 'src/app/services/back-end.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  styles: [
  ]
})
export class CobrosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  cobros: any[];
  constructor(private route: Router, private service: BackEndService) { }

  ngOnInit(): void {
    this.retornaCobrosPorPagar();
  }

  retornaCobrosPorPagar(){
    this.service.retornaCobrosPorPagar().subscribe(resp => {
      this.cobros = resp;
      this.dtTrigger.next();
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      responsive: true
    };
  }


  editar( id_cobro: string){
    localStorage.setItem('id_cobro',id_cobro);
    this.route.navigateByUrl('SX-CONSOLE/general/pagos');
  }
}
