import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../../interfaces/heroe';
import { HeroeService } from '../../../services/heroe.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastService } from '../../../services/toast.service';
import { URL_ARCHIVOS } from 'src/environments/environment';
import { ImagenesService } from '../../../services/imagenes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  urlImagen = `${URL_ARCHIVOS}heroes/`;

  constructor( private _heroeService: HeroeService, private router: Router, private _toastService: ToastService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(){
    this._heroeService.getHeroes(localStorage.getItem('id')).subscribe( (heroes => {
      this.heroes = heroes['heroes'];
    }));
  }
  detalles( id: string ){
    this.router.navigateByUrl('/admin/heroe/'+id);
  }
  editar( id: string ){
    this.router.navigateByUrl('/admin/editarHeroe/'+id);
  }
  eliminar( id: string, heroe: string ){
    console.log(heroe);
    Swal.fire({
      title:'¿Está seguro?',
      text:`Está seguro que desea borrar a ${ heroe }`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true,
    }).then( resp =>{

      if( resp.value ){
        this._heroeService.eliminarHeroe(id).subscribe( (heroes => {
          this._toastService.showNotification("top","center","success", 'Heroe eliminado correctamente' );
          this.getHeroes();
        }));
      }else{
        this._toastService.showNotification("top","center","warning", `El heroe ${heroe} no fue eliminado` );
      }
    });

  }

}
