import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styles: [
  ]
})
export class SiteHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.getElementById('principal_body').className = 'hold-transition login-page bg_font';
  }

}
