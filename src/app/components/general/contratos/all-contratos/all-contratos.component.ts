import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { FilePdfService } from './../../../../services/file-pdf.service';
import { BackEndService } from 'src/app/services/back-end.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-contratos',
  templateUrl: './all-contratos.component.html',
  styles: [
  ]
})
export class AllContratosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  contratos: any[];
  contrato: any;
  cliente: any;
  empresa: any;
  equipoC: any;
  equipoA: any;
  plan: any;
  constructor(private route: Router, private service: BackEndService, private pdf: FilePdfService, private empService: EmpreServicesService) { }

  ngOnInit(): void {
    this.listarContratos();
  }

  listarContratos() {
    //console.log("CONTRATOS");
    this.service.retornaAllContratos().subscribe(data => {
      this.contratos = data;
      this.dtTrigger.next();
    });
  }

  generaContrato(emp: string, cli: string, plan: string, contra: string) {
    Swal.fire({ title: 'info', text: 'Generando ..', allowOutsideClick: false });
    Swal.showLoading();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.service.retorna_Contrato(contra).subscribe(resp => { this.contrato = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.CLienteID(cli).subscribe(resp => { this.cliente = resp; });
    }, 1000);

    setTimeout(() => {
      this.empService.empresaById(emp).subscribe(resp => { this.empresa = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.consultaPlanId(plan).subscribe(resp => { this.plan = resp; });
    }, 1000);

    setTimeout(() => {
      Swal.close();
      this.pdf.Contrato(this.empresa, this.cliente, this.plan, this.contrato);
    }, 4000);

  }

  generaAnexo1(emp: string, cli: string, plan: string, contra: string) {
    Swal.fire({ title: 'info', text: 'Generando ..', allowOutsideClick: false });
    Swal.showLoading();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.service.retorna_Contrato(contra).subscribe(resp => { this.contrato = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.CLienteID(cli).subscribe(resp => { this.cliente = resp; });
    }, 1000);

    setTimeout(() => {
      this.empService.empresaById(emp).subscribe(resp => { this.empresa = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.consultaPlanId(plan).subscribe(resp => { this.plan = resp; });
    }, 1000);

    setTimeout(() => {
      Swal.close();
      //this.pdf.Contrato(this.empresa, this.cliente, this.plan, this.contrato);
      this.pdf.Anexo1(this.empresa, this.cliente, this.plan, this.contrato);
    }, 4000);
    //this.pdf.Anexo1(emp, cli, plan, contra);
  }

  generaAnexo2(emp: string, cli: string, plan: string, contra: string) {
    Swal.fire({ title: 'info', text: 'Generando ..', allowOutsideClick: false });
    Swal.showLoading();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.service.retorna_Contrato(contra).subscribe(resp => { this.contrato = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.CLienteID(cli).subscribe(resp => { this.cliente = resp; });
    }, 1000);

    setTimeout(() => {
      this.empService.empresaById(emp).subscribe(resp => { this.empresa = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.retorna_EquipoCliente(contra, cli, 'COMPRA').subscribe(resp => { this.equipoC = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.retorna_EquipoCliente(contra, cli, 'ARRIENDO').subscribe(resp => { this.equipoA = resp; });
    }, 1000);
    
    setTimeout(() => {
      Swal.close();
      //this.pdf.Contrato(this.empresa, this.cliente, this.plan, this.contrato);
      this.pdf.Anexo2(this.empresa, this.cliente, this.equipoC, this.equipoA, this.contrato);
    }, 4000);
    
  }
  generaAnexo3(emp: string, cli: string, plan: string, contra: string) {
    Swal.fire({ title: 'info', text: 'Generando ..', allowOutsideClick: false });
    Swal.showLoading();
    setTimeout(() => {                           //<<<---using ()=> syntax
      this.service.retorna_Contrato(contra).subscribe(resp => { this.contrato = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.CLienteID(cli).subscribe(resp => { this.cliente = resp; });
    }, 1000);

    setTimeout(() => {
      this.empService.empresaById(emp).subscribe(resp => { this.empresa = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.consultaPlanId(plan).subscribe(resp => { this.plan = resp; });
    }, 1000);

    setTimeout(() => {
      Swal.close();
      this.pdf.Anexo3(this.empresa, this.cliente, this.plan, this.contrato);
    }, 4000);

  }
  generaAnexo4(emp: string, cli: string, plan: string, contra: string) {
    Swal.fire({ title: 'info', text: 'Generando ..', allowOutsideClick: false });
    Swal.showLoading();
    setTimeout(() => {
      this.service.CLienteID(cli).subscribe(resp => { this.cliente = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.retorna_EquipoCliente(contra, cli, 'COMPRA').subscribe(resp => { this.equipoC = resp; });
    }, 1000);

    setTimeout(() => {
      this.service.consultaPlanId(plan).subscribe(resp => { this.plan = resp; });
    }, 1000);

    setTimeout(() => {
      this.empService.empresaById(emp).subscribe(resp => { this.empresa = resp; });
    }, 1000);
    //this.pdf.Anexo4(emp, cli, plan, contra);
    setTimeout(() => {
      Swal.close();
      this.pdf.Anexo4(this.cliente, this.equipoC, this.plan, this.empresa);
    }, 4000);

  }

}
