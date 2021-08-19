import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocationModel } from 'src/app/models/LocationModel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  
  private url = 'http://localhost:8080/Repository/locationController';
  private endpoint2 = 'http://157.245.177.172/Repository2/backController/';
  constructor(private http: HttpClient) { }

  retornaPais(){
    //return this.http.post<LocationModel[]>(`${this.url}/retornaPais`, '');
    const data = new HttpParams().set('tipo', 'P').set('padre', null);
    return this.http.post<any[]>(`${this.endpoint2}/consultaLocation`, data);
  }


}
