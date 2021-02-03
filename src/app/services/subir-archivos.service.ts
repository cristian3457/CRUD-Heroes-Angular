import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/environments/environment';
import { ToastService } from './toast.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  @BlockUI() blockUI: NgBlockUI;
  constructor(private _toastService:ToastService) { }

  subirArchivo( archivos: File[], tipo: string, id: string,campo: string, blockUI: NgBlockUI = this.blockUI, _toastService: ToastService = this._toastService ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      let index: number = 0; 
      // console.log( 'datos archivo:',archivos );
      for (const archivo of archivos) {
        index++;
        // console.log( 'nombre archivo:',archivo.name );
        formData.append( `archivo${index}`, archivo, archivo.name );
      }

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            // console.log( 'Archivo subido' );
            // console.log(xhr.response);
            blockUI.stop();
            _toastService.showNotification('top','center','success','Se subio el archivo correctamente');
            resolve( JSON.parse( xhr.response ) );
          } else {
            // console.log( 'Fallo la subida' );
            // console.log(xhr.response);
            blockUI.stop();
            _toastService.showNotification('top','center','danger','Ocurrio un error al subir archivo');
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + 'upload/' + tipo + '/' + id + '/' + campo;

      xhr.open('PUT', url, true );
      xhr.send( formData );

    });
  }
}
