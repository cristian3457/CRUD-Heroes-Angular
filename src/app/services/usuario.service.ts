import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  _url = `${URL_SERVICIOS}usuario/`;
  _urlL: string = `${URL_SERVICIOS}login/`;
  token: string;
  usuario: any;
  httpOptions: any;

  constructor(private http: HttpClient, private router: Router, private _toastService: ToastService) { 
    this.cargarStorage();
  }

  insert(usuario: Usuario) {
    return this.http.post(this._url, usuario)
      .pipe(
        map((usuario: Usuario) => {
          return usuario;
        })
        , catchError((err: any) => {
          if( err.error.err){
            let errores: any= err.error.err.errors;
            let mensajes: any[] = this.crearArreglo(errores);
            for (const mensaje of mensajes) {
              this._toastService.showNotification("top","center","danger", mensaje.message );
            }
          }else{
            this._toastService.showNotification("top","center","danger", 'Ocurrio un error' );
          }
          return throwError(err);
        })
      );

  }
  updateNombre( id: string, nombre: string) {
    this.crearHeaders();
    return this.http.put(`${this._url}actualizaNombre/${id}`, {nombre}, this.httpOptions)
      .pipe(
        map((usuario: any) => usuario)
        , catchError((err: any) => {
          this._toastService.showNotification('top', 'center', 'danger','Ocurrio un error al actualizar nombre')
          this._toastService.errorsMessage(err);
          return throwError(err);
        })
      );

  }
  updatePassword( id: string, password: string) {
    this.crearHeaders();
    return this.http.put(`${this._url}actualizaPassword/${id}`, {password}, this.httpOptions)
      .pipe(
        map((usuario: any) => usuario)
        , catchError((err: any) => {
          this._toastService.showNotification('top', 'center', 'danger','Ocurrio un error al actualizar contraseña')
          this._toastService.errorsMessage(err);
          return throwError(err);
        })
      );

  }
  verificaToken(token: string){
    this.crearHeaders();
    return this.http.get(`${this._url}token`, this.httpOptions).pipe(
      map((respuesta:any) => respuesta.ok)
      ,catchError((err: any) => {
        this._toastService.showNotification('top', 'center', 'danger','Ocurrio un error al verificar token');
        return throwError(err);
      })
    )
  }

  respuestaToken(token: string): Promise<boolean>{
    if(token != undefined){
      return new Promise( (resolve, reject) => {
        this.verificaToken(token).subscribe(res => {
          if( res == true){
            resolve(true);
          }else if( res == false){
            this.router.navigateByUrl("/auth");
            resolve(false);
          }else{
            this.router.navigateByUrl("/auth");
            reject(false);
          }
        })
      });
    }else{
     return new Promise( (resolve, reject) => {
      this.router.navigateByUrl("/auth");
      resolve(false);
      });
    }

  }
  login(email: string, password: string) {

    return this.http.post(this._urlL, {email, password})
      .pipe(
        map((usuario: any) => {
          this.guardarStorage(usuario.usuario._id, usuario.token,usuario.usuario);
          return usuario;
        })
        , catchError((err: any) => {
          var mensaje = "";
          if(err.error.mensaje){
            mensaje = err.error.mensaje;
          }else{
            mensaje = 'Ocurrio un error';
          }
          this._toastService.showNotification("top","center","danger","Los datos que ingresaste son incorrectos" );
          return throwError(err);
        })
      );

  }

  logout(){
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('usuario');
    this.router.navigate(['/auth/login']);
  }
  cargarStorage(){
    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  crearHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
    };
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
}
