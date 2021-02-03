import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { ToastService } from '../../../services/toast.service';
import { HeroeService } from '../../../services/heroe.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre: string;
  pass1: string;
  pass2: string;
  coincidePass: string;
  usuario: Usuario[] = [];
  ultimosHeroes: string[] = [];
  constructor( private _usuarioService: UsuarioService, private _toastService: ToastService, private _heroeService: HeroeService) { 
    if( localStorage.getItem('usuario')){
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.nombre = this.usuario['nombre'];
      this._heroeService.getUltimosHeroes(this.usuario['_id']).subscribe( heroes => this.ultimosHeroes = heroes);
    }
    _usuarioService.respuestaToken(localStorage.getItem('token'));
  }

  ngOnInit(): void {
 
  }
  actualizarNombre(){
    if( this.nombre && this.nombre.length > 4 ){
      this._usuarioService.updateNombre(this.usuario['id'],this.nombre).subscribe( ( usuario:Usuario ) => {
        this._usuarioService.guardarStorage(this.usuario['_id'],this._usuarioService.token,usuario['usuario']);
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.nombre = this.usuario['nombre'];
        $('#modalNombre').modal('hide'); 
        this._toastService.showNotification('top', 'center', 'success','Nombre actualizado correctamente');
      });
    }
  }
  actualizarPassword(){
    if( (this.pass1 && this.pass1.length > 7 ) && (this.pass2 && this.pass2.length > 7 )){
      if( this.pass1 === this.pass2){
        this._usuarioService.updatePassword('600f34fbb1a2e63c6c7a369b',this.pass1).subscribe( ( usuario:Usuario ) => {
          $('#modalPassword').modal('hide');
          this._toastService.showNotification('top', 'center', 'success','Contraseña actualizada correctamente');
      });
      }else{
        this.coincidePass = 'Las contraseñas ingresadas no coinciden, verifica tu información'
      }
    }
  }

}
