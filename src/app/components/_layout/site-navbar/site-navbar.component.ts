import { EmpreServicesService } from 'src/app/services/empre-services.service';
import { BackEndService } from 'src/app/services/back-end.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-navbar',
  templateUrl: './site-navbar.component.html',
  styles: [
  ]
})
export class SiteNavbarComponent implements OnInit {
  empresa1:any;
  razonScoial:string;
  logo :string;
  constructor(private route: Router, private service: BackEndService, private emp: EmpreServicesService) { }

  ngOnInit(): void {
    this.emp.empresaById(localStorage.getItem('id_empresa')).subscribe( resp => { 
      this.empresa1 = resp;
      this.razonScoial = this.empresa1.razon_social.trim();
      if(resp['logo_route'].trim().length>0){
        this.logo = `http://157.245.177.172/Repository2/UPLOADS/LOGOS/${resp['ruc'].trim()}/${resp['logo_route']}`;
      }else{
        this.logo = null;
      }
      
      console.log(this.logo); 
    });
  }

}
