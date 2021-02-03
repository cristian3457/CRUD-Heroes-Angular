import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroeService } from '../../../services/heroe.service';
import { Heroe } from '../../../interfaces/heroe';
import { ToastService } from '../../../services/toast.service';
import { URL_ARCHIVOS } from '../../../../environments/environment';
import { SubirArchivosService } from '../../../services/subir-archivos.service';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-registrar-editar-heroe',
  templateUrl: './registrar-editar-heroe.component.html',
  styleUrls: ['./registrar-editar-heroe.component.css']
})
export class RegistrarEditarHeroeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  formulario: FormGroup;
  operacion: string;
  idHeroe: string;
  heroe: Heroe[] = [];
  imgSeleccionada = `${URL_ARCHIVOS}noImage/no-image.jpg`;
    // archivos
    public archivoSubir: File;
    public archivoTemp: any = null;
    public archivos: any[] = [];
    public archivosSubir: any[] = [];
    public archivoEditar = '';
  public url = URL_ARCHIVOS;
  constructor( private _subirArchivos: SubirArchivosService ,private _toastService: ToastService, private fb: FormBuilder, private router: Router, private _heroeService: HeroeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.activatedRoute.params.subscribe( params => {
      if(params['id']){
        this.idHeroe = params['id'];
        this.operacion = 'EDITAR';
        this._heroeService.getHeroe(this.idHeroe).subscribe( heroe => {
          this.heroe = heroe['heroe'];
          this.cargarDatosFormulario();
        })
      }else{
        this.operacion = 'REGISTRAR';
      }
    });
  }

  crearFormulario(){
    this.formulario = this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(3)]],
    aparicion:['',[Validators.required]],
    casa:['',[Validators.required,Validators.minLength(2)]],
    img:[''],
    descripcion:['',[Validators.required,Validators.minLength(10)]],
    });
  }
  cargarDatosFormulario(){
    this.formulario.setValue({
      nombre: this.heroe['nombre'],
      aparicion: this.heroe['aparicion'].split('T')[0],
      casa: this.heroe['casa'],
      img:null,
      descripcion: this.heroe['descripcion']
    });
    if(this.heroe['img'] ){
      this.imgSeleccionada = `${URL_ARCHIVOS}heroes/${this.heroe['img']}`;
    }
  }
  guardar(){
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
      if(this.operacion === 'REGISTRAR'){
        if (this.archivosSubir.length > 0) {
          this.blockUI.start();
        this._heroeService.insert({...this.formulario.value, usuario: localStorage.getItem('id')}).subscribe( (heroe: Heroe ) => {
          this._toastService.showNotification("top","center","success", 'Heroe insertado correctamente' );
          this._subirArchivos.subirArchivo(this.archivosSubir, 'heroes', heroe['heroe']._id, 'img').then((res3: any) => {
            this._toastService.showNotification('top', 'center', 'success', 'Imagen subida correctamente');
            this.router.navigateByUrl('/admin/heroes');
          })
        });
      }else{
        this._toastService.showNotification('top', 'center', 'warning', 'Tienes que seleccionar la imagen del heroe');
      }
      }else if(this.operacion === 'EDITAR'){
        if (this.archivosSubir.length > 0) {
                    this._heroeService.updateHeroe(this.idHeroe,{...this.formulario.value, usuario: localStorage.getItem('id')}).subscribe( (heroe: Heroe ) => {
            this._toastService.showNotification("top","center","success", 'Heroe actualizado correctamente' );
            this._subirArchivos.subirArchivo(this.archivosSubir, 'heroes', heroe['heroe']._id, 'img').then((res3: any) => {
              this._toastService.showNotification('top', 'center', 'success', 'Imagen subida correctamente');
              this.router.navigateByUrl('/admin/heroes');
            })
          });
        }else{
          this._heroeService.updateHeroe(this.idHeroe,{...this.formulario.value, usuario: localStorage.getItem('id')}).subscribe( (heroe: Heroe ) => {
            this._toastService.showNotification("top","center","success", 'Heroe actualizado correctamente' );
            this.router.navigateByUrl('/admin/heroes');
          });
        }
      }
    }
  }
  campoNoValido(campo: string){
    return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
  }
  seleccionArchivo(archivo: File) {
    this.archivoEditar = '';
    const reader = new FileReader();
    const urlArchivoTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.archivoTemp = reader.result;
      this.imgSeleccionada = this.archivoTemp;
      this.archivos = [
        reader.result
      ];
      this.archivosSubir = [
        archivo
      ];
    };
  }

}
