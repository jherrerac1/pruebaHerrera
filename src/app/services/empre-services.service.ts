import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Empresa } from 'src/app/models/EmpresaModel';

@Injectable({
  providedIn: 'root'
})
export class EmpreServicesService {

  private url = 'http://localhost:8080/Repository/';
  private endpoint2 = 'http://157.245.177.172/Repository2/backController/';

  constructor(private http: HttpClient) { }

  listarEmpresa() {
    // EmpresaController/ListarEmpresa
    // return this.http.post<Empresa[]>(`${this.url}EmpresaController/ListarEmpresa`, '');
    return this.http.post<Empresa[]>(`${this.endpoint2}ListarEmpresa`, '');
  }

  empresaById(id: string) {
    const data = new HttpParams().set('id_empresa', id);
    return this.http.post<Empresa>(`${this.endpoint2}EmpresaId`, data);
  }

  guardarEmpresa(e: Empresa) {
    // return this.http.post<Empresa>(`${this.url}EmpresaController/GuardarEmpresa`, empresa);
    if(e.localidad == null){
      e.localidad =0;
    }
    const data = new HttpParams()
    .set('cargo_repre', e.cargo_repre )
    .set('ci_repre', e.dni )
    .set('dni', e.dni )
    .set('ciudad', e.ciudad.toString() )
    .set('direccion', e.direccion )
    .set('dni', e.dni )
    .set('email', e.email )
    .set('email_repre', e.email_repre )
    .set('estado', e.estado )
    .set('localidad', e.localidad.toString() )
    .set('nombre', e.nombre )
    .set('pais', e.pais.toString() )
    .set('provincia', e.provincia.toString() )
    .set('razon_social', e.razon_social )
    .set('representante_legal', e.representante_legal )
    .set('ruc', e.ruc )
    .set('site_web', e.site_web )
    .set('logo_route', localStorage.getItem('logo_route') )
    .set('telefono', e.telefono )
    .set('telefono_add', e.telefono_add )
    .set('usuario_creacion', localStorage.getItem('nombre') )
    ;
    return this.http.post(`${this.endpoint2}GrabarEmpresa`, data);
  }


  ActualizarEmpresa(e: Empresa) {
    if( e.localidad == null){
      e.localidad = 0;
    }
    console.log(e);
    const data = new HttpParams().set('id_empresa', e.id_empresa.toString())
    .set('cargo_repre', e.cargo_repre )
    .set('ci_repre', e.dni )
    .set('dni', e.dni )
    .set('ciudad', e.ciudad.toString() )
    .set('direccion', e.direccion )
    .set('dni', e.dni )
    .set('email', e.email )
    .set('email_repre', e.email_repre )
    .set('estado', e.estado )
    .set('localidad', e.localidad.toString() )
    .set('nombre', e.nombre )
    .set('pais', e.pais.toString() )
    .set('provincia', e.provincia.toString() )
    .set('razon_social', e.razon_social )
    .set('representante_legal', e.representante_legal )
    .set('ruc', e.ruc )
    .set('site_web', e.site_web )
    .set('logo_route', localStorage.getItem('logo_route'))
    .set('telefono', e.telefono )
    .set('telefono_add', e.telefono_add )
    .set('usuario_creacion', localStorage.getItem('nombre') );
    return this.http.post(`${this.endpoint2}ActualizarEmpresa`, data);
  }
}
