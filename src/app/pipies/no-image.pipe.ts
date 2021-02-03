import { Pipe, PipeTransform } from '@angular/core';
import { URL_ARCHIVOS } from 'src/environments/environment';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(nombreImagen: string): string {
    let urlImagen = `${URL_ARCHIVOS}`;
    if(nombreImagen){
      return `${urlImagen}heroes/${nombreImagen}`
    }else{
      return `${urlImagen}noImage/no-image.jpg`;
    }
  }

}
