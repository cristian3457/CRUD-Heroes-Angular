import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  _url = `${URL_SERVICIOS}imagen/`;

  constructor( private http: HttpClient) { }

  getHeroeImg( img: string){

    return this.http.get(`${this._url}heroes/${img}`).pipe(  
      catchError((err: any) => {
        return throwError(err);
      })
    )
  }

  


}
