import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
declare var $;
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  usuario:any;
  recordarme = '';
  formulario: FormGroup;
  constructor( private fb: FormBuilder, private _usuarioService: UsuarioService, private _toastService: ToastService, private router: Router) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
  }

  registrarUsuario(){
    if( this.formulario.invalid ){
      return Object.values( this.formulario.controls).forEach( control =>{
        console.log(control);
        if( control instanceof FormGroup ){
          Object.values( control.controls).forEach( control => control.markAllAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
    else{
      let email = this.formulario.get('email').value;
      let password = this.formulario.get('password').value;
      this.insertarUsuario(email,password);
    }
  }
  crearFormulario(){
    this.formulario = this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(5)]],
      email:['',[Validators.required, Validators.minLength(5),Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password:['',[Validators.required, Validators.minLength(8)]],
      repPassword:['',[Validators.required, Validators.minLength(8)]],
      recordar:['']
    });
  }
  get emailNoValido(){
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }
  get passwordNoValido(){
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }
  get nombreNoValido(){
    return this.formulario.get('nombre').invalid && this.formulario.get('nombre').touched;
  }
  get repPass2LongitudNoValido(){
    return this.formulario.get('repPassword').invalid && this.formulario.get('repPassword').touched;
  }
  get repPasswordNoValido(){
    const pass1 = this.formulario.get('password').value;
    const pass2 = this.formulario.get('repPassword').value;
    return (pass1 === pass2 ) ? false : true;
  }
  insertarUsuario(email,password){
    this._usuarioService.insert(this.formulario.value).subscribe(( usuario: Usuario ) => {
      this._toastService.showNotification("top","center","success", 'Usuario registrado satisfactoriamente' );
      this._usuarioService.login(email,password).subscribe( (res: any) => {
        let correo = '';
        if( this.formulario.get('recordar').value === true){
          correo = email;
        }
        localStorage.setItem('recordar', correo);
        this.router.navigateByUrl('/admin/home');
      });
    });
  }
}
