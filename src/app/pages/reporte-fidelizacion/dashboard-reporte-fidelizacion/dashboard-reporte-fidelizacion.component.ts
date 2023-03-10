import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment.lang('es');
import { CorsService } from '@services';



@Component({
  selector: 'dashboard-reporte-fidelizacion',
  templateUrl: './dashboard-reporte-fidelizacion.component.html',
  styleUrls: ['./dashboard-reporte-fidelizacion.component.scss']
})
export class DashboardReporteFidelizacionComponent implements OnInit {

  formReporte:UntypedFormGroup;
  today = new Date();
  result:any=[];

  constructor(private formBuilder: UntypedFormBuilder,private cors: CorsService) { 
    this.formReporte = this.formBuilder.group({
      reporte: [null, Validators.required],
      fechaini: [null, Validators.required],
      fechafin: [null, Validators.required],
    });
    this.cors
    .get('Reporte/vici')
    .then((response) => {
      // console.log(response)
      this.result = response;
    //   this.messageService.add({
    //     key: 'tst',
    //     severity: 'success',
    //     summary: 'Datos guardados',
    //     detail: 'La solicitud de cancelacion fue guardada',
    //   });
    })
    .catch((error) => {
      console.log(error)
    //   this.msgs.push({
    //     severity: 'error',
    //     summary: 'No se logro guardar',
    //     detail: 'La solicitud de cancelacion no fue guardada',
    //   });
    });

  }

  ngOnInit(): void {

  }

  dateFormat(value:any){
    return moment(value).format('yyyy-MM-DD hh:mm:ss')
  }

  cambioReporte(event:any){
    console.log(event)
  }

  enviar(){
    console.log(this.formReporte)
    this.cors.getCommand(`http://192.168.48.225:9000?command=REBOOT`)
    // this.cors.getCommand(`http://192.168.50.58:9000?command=REBOOT`)
  }

}
