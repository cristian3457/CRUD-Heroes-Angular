import { Injectable } from '@angular/core';
declare var $;
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }
  showNotification(from, align, type, message ){
    const validTypes = ['','info','success','warning','danger'];

    $.notify({
        icon: "notifications",
        message

    },{
        type: type,
        timer: 2000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
  errorsMessage(err:any){
    if(err.error){
      console.log('error');
      if(err.error.errors){
        console.log('errors');
        if(err.error.errors.errors){
          console.log('errors2');
          for (const key in err.error.errors.errors) {
            if (err.error.errors.errors.hasOwnProperty(key)) {
              const element = err.error.errors.errors[key];
              if(element.properties){
                console.log(element);
                this.showNotification('top', 'center', 'danger',`${element.properties.message}`)
              }else{
                this.showNotification('top', 'center', 'danger','Ocurrio un error desconocido')
              }
            }
          }
        }
      }
    }
  }
}
