import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  _url = `${URL_SERVICIOS}heroe/`;
  httpOptions: any;
  constructor(private http: HttpClient, private _toastService :ToastService, private router: Router) { }

  getHeroes(idUsuario: string) {
    this.crearHeaders();
    return this.http.get(`${URL_SERVICIOS}heroes/${idUsuario}`,this.httpOptions)
      .pipe(
        map((heroes: any) => heroes)
        , catchError((err: any) => {
          this._toastService.showNotification("top","center","danger", 'Ocurrio un error al obtener los heroes' );
          this.router.navigateByUrl('/admin/home')
          return throwError(err);
        })
      );
  }
  getHeroe(idHeroe: string) {
    this.crearHeaders();
    return this.http.get(`${this._url}${idHeroe}`,this.httpOptions)
      .pipe(
        map((heroe: any) => heroe)
        , catchError((err: any) => {
          this._toastService.showNotification("top","center","danger", 'Ocurrio un error al obtener el heroe' );
          this.router.navigateByUrl('/admin/heroes')
          return throwError(err);
        })
      );

  }
  getUltimosHeroes(idUsuario: string) {
    this.crearHeaders();
    return this.http.get(`${URL_SERVICIOS}ultimosHeroes/${idUsuario}`,this.httpOptions)
      .pipe(
        map((heroes: any) => heroes['heroes'])
        , catchError((err: any) => {
          this._toastService.showNotification("top","center","danger", 'Ocurrio un error al obtener los últimos heroes' );
          return throwError(err);
        })
      );
  }

  insert(heroe: Heroe) {
    this.crearHeaders();
    return this.http.post(this._url, heroe,this.httpOptions)
      .pipe(
        map((heroe: any) => heroe)
        , catchError((err: any) => {
          if( err.error.err){
            let errores: any= err.error.err.errors;
            let mensajes: any[] = this.crearArreglo(errores);
            for (const mensaje of mensajes) {
              this._toastService.showNotification("top","center","danger", mensaje.message );
            }
          }else{
            this._toastService.showNotification("top","center","danger", 'Ocurrio un error' );
            this.router.navigateByUrl('/admin/heroes');
          }
          return throwError(err);
        })
      );

  }
  updateHeroe( id: string, heroe: Heroe) {
    this.crearHeaders();
    return this.http.put(`${this._url}${id}`, heroe,this.httpOptions)
      .pipe(
        map((heroe: any) => heroe)
        , catchError((err: any) => {
          if( err.error.err){
            let errores: any= err.error.err.errors;
            let mensajes: any[] = this.crearArreglo(errores);
            for (const mensaje of mensajes) {
              this._toastService.showNotification("top","center","danger", mensaje.message );
            }
          }else{
            this._toastService.showNotification("top","center","danger", 'Ocurrio un error' );
            this.router.navigateByUrl('/admin/heroes');
          }
          return throwError(err);
        })
      );

  }
  eliminarHeroe( id: string) {
    this.crearHeaders();
    return this.http.delete(`${this._url}${id}`,this.httpOptions)
      .pipe(
        map((heroe: any) => heroe)
        , catchError((err: any) => {
          this._toastService.showNotification("top","center","danger", 'Ocurrio un error' );
          return throwError(err);
        })
      );

  }
  private crearArreglo( erroresObj: object ){

    const mensajes: any[] = [];
    if( erroresObj === null){
      return [];
    }
    else{
      Object.keys( erroresObj ).forEach( key => {
        const error: any = erroresObj[key];
        error.id = key;
        mensajes.push( error ); 
      });
      return mensajes;
    }
  }
  crearHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
    };
  }
}
