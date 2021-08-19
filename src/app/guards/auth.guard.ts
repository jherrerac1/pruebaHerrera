import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.auth.autenticado()){
      return true;
    }else{
      this.router.navigateByUrl('/SX-CONSOLE/login');
      return false;
    }
    
  }
  
}
