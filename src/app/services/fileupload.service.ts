import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  private endpoint2 = 'http://157.245.177.172/Repository2/fileController/';

  constructor(private http: HttpClient) { }

  subirImagen(datos: any) {
    return this.http.post(`${this.endpoint2}subirArchivos`, datos);
  }

  subirImagenCliente(datos: any) {
    return this.http.post(`${this.endpoint2}subirArchivosCli`, datos);
  }
  subirImagenClientePago(datos: any){
    return this.http.post(`${this.endpoint2}subirArchivosPagos`, datos);
  }
}
