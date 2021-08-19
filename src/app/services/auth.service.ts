import { Injectable } from '@angular/core';
import { UsuarioModel } from 'src/app/models/UsuarioModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private nombre: string;
  private apellido: string;
  private perfil: string;
  private empresa: string;

  private url = 'http://localhost:8080/Repository/authController';
  private endpoint2 = 'http://157.245.177.172/Repository2/authController/';

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioModel) {
    //const pass: string = CryptoJS.AES.encrypt(usuario.password.trim(), 'Kn0wC3ll2@2@').toString();
    const pass: string = CryptoJS.SHA1(usuario.password.trim());

    const autData = new HttpParams().set('user', usuario.user_name).set('password', pass);

    // return  this.http.post(`${ this.url }/login?user=${usuario.user_name}&password=${usuario.password}`, autData);

    /*return  this.http.post(`${ this.url }/login`, autData).pipe(map( resp =>{

      if(resp['data']['empresa'] !== null){
        this.guardarInformacion(resp['data']['nombre'], resp['data']['apellido'], resp['data']['perfil'],
        resp['data']['empresa']
      );  
      }else{
        this.guardarInformacion(resp['data']['nombre'], resp['data']['apellido'], resp['data']['perfil'],
        ''
      );  
      }
      
      return resp;
    }));*/
    return this.http.post(`${this.endpoint2}autenticar`, autData).pipe(map(resp => {
      if (resp['data'] !== null) {
        if (resp['data']['id_empresa'] !== null) {
          this.guardarInformacion(resp['data']['user_name'], resp['data']['apellido'], resp['data']['id_perfil'],
            resp['data']['id_empresa']);
        } else {
          this.guardarInformacion(resp['data']['user_name'], resp['data']['apellido'], resp['data']['id_perfil'], '');
        }
      }

      return resp;
    }));
  }

  private guardarInformacion(nombreUsr: string, apellido: string, perfil: string, empresa?: string) {
    this.nombre = nombreUsr;
    localStorage.setItem('nombre', nombreUsr);
    this.apellido = apellido;
    localStorage.setItem('apellido', apellido);
    this.perfil = perfil;
    localStorage.setItem('id_perfil', perfil);

    if (empresa !== '') {
      this.empresa = empresa;
      localStorage.setItem('id_empresa', empresa);
    }
  }

  leerInfo() {
    if (localStorage.getItem('nombre')) {
      this.nombre = localStorage.getItem('nombre');
    } else {
      this.nombre = '';
    }
  }

  autenticado(): boolean {
    this.leerInfo();
    return this.nombre.length > 1;
  }

  logaut() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('id_perfil');
    localStorage.removeItem('id_empresa');
    localStorage.clear();

  }
}
