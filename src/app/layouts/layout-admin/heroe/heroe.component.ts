import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_ARCHIVOS } from 'src/environments/environment';
import { Heroe } from '../../../interfaces/heroe';
import { HeroeService } from '../../../services/heroe.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: Heroe[] = [];
  idHeroe: string;
  urlImagen = `${URL_ARCHIVOS}heroes/`;
  constructor( private _heroeService: HeroeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.idHeroe = params['id'];
      console.log(this.idHeroe);
      if( this.idHeroe ){
        this._heroeService.getHeroe(this.idHeroe).subscribe( heroe => this.heroe =  heroe['heroe']);
      }
    });

  }

}
