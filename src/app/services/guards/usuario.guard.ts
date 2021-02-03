import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  constructor(private _usuarioService: UsuarioService, private router: Router){

  }
  // this._usuarioService.verificaToken(localStorage.getItem('token')).subscribe();
  // this._usuarioService.verificaToken1(localStorage.getItem('token'))
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      return this._usuarioService.respuestaToken(localStorage.getItem('token'))
      .then((res:boolean) => res)
      .catch((res:boolean) => res);
  }
  
}
