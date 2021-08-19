import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-site-header2',
  templateUrl: './site-header2.component.html',
  styles: [
  ]
})
export class SiteHeader2Component implements OnInit {

  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
    document.getElementById('principal_body').className = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed img_font';

  }

  salir(){
    this.auth.logaut();
    this.route.navigateByUrl('/SX-CONSOLE/login');
  }

}
