import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  email = '';
  recordar:any;
  constructor( private fb: FormBuilder, private _usuarioService: UsuarioService, private router: Router) { 
    if(localStorage.getItem('token')){
      _usuarioService.verificaToken(localStorage.getItem('token')).subscribe( res => {
        if( res === true ){
          this.router.navigateByUrl('/admin/home')
        }
      })
    }
    this.formulario = fb.group({
      email:['',[Validators.required, Validators.minLength(5),Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],[]],
      password:['',[Validators.required, Validators.minLength(8)],[]],
      recordar:['']
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('recordar') && localStorage.getItem('recordar').length > 5){
      this.email = localStorage.getItem('recordar');
      this.formulario.get('email').setValue(this.email);
      this.formulario.get('recordar').setValue(true);
    }
  }
  login(){

    if( this.formulario.invalid ){
      return Object.values( this.formulario.controls).forEach( control =>{
        if( control instanceof FormGroup ){
          Object.values( control.controls).forEach( control => control.markAllAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
    else{
      let email = this.formulario.controls['email'].value;
      let password = this.formulario.controls['password'].value;
      this._usuarioService.login(email, password).subscribe((res: any ) => {
        let correo = '';
        if( this.formulario.get('recordar').value === true){
          correo = email;
        }
        localStorage.setItem('recordar', correo);
        this.router.navigate(['/admin/home']);
      });
    }
  }
  get emailNoValido(){
    return this.formulario.get('email').invalid && this.formulario.get('email').touched;
  }
  get passwordNoValido(){
    return this.formulario.get('password').invalid && this.formulario.get('password').touched;
  }

}
