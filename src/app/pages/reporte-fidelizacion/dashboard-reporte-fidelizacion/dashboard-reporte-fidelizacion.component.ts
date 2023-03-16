import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment.lang('es');
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';



@Component({
  selector: 'dashboard-reporte-fidelizacion',
  templateUrl: './dashboard-reporte-fidelizacion.component.html',
  styleUrls: ['./dashboard-reporte-fidelizacion.component.scss']
})
export class DashboardReporteFidelizacionComponent implements OnInit {

  formReporte:UntypedFormGroup;
  today = new Date();
  result:any=[];
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")


  constructor(private messageService: MessageService,private formBuilder: UntypedFormBuilder,private cors: CorsService) { 
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

    console.log(this.usuario)

  }

  dateFormat(value:any){
    return moment(value).format('yyyy-MM-DD hh:mm:ss')
  }

  enviar(){
    this.formReporte.markAllAsTouched();
    // console.log(this.formReporte)
    // this.cors.getCommand(`http://192.168.48.225:21?command=REBOOT`)
    // this.cors.getCommand(`http://192.168.48.225:80?command=REBOOT`)
    // this.cors.getCommand(`http://192.168.48.225:9000?command=REBOOT`)
    // this.cors.getCommand(`http://192.168.50.58:9000?command=REBOOT`)
    // this.cors.getCommand(`http://192.168.61.4:9000?command=REBOOT`)
    // this.cors.getCommand(`http://20.51.210.241:9000?command=REBOOT`)
    if(this.formReporte.valid){
        let a={
          "id":0,
          "Cve_usuario": `${this.usuario.email}`,
          "list_id": `${this.formReporte.value.reporte}`,
          "archivo": "",
          "procesando": "",
          "fechaCaptura": null,
          "fechaCompletado": null,
          "status": "",
          "ip": "" 
        }
        this.cors.post('Reporte/GuardarFormularioEjecucionReporte',a)
        .then((response) => {
          // console.log(response)
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Datos guardados',
            detail: 'La solicitud de cancelacion fue guardada',
          });
        })
        .catch((error) => {
          console.log(error)
          this.messageService.add({
            key:'tst',
            severity: 'error',
            summary: 'No se logro guardar',
            detail: 'Intenta Nuevamente!!!',
          });
        });
        this.formReporte.controls['reporte'].reset();
        this.formReporte.controls['fechaini'].reset();
        this.formReporte.controls['fechafin'].reset();
    }else{
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'Faltaron campos por rellenar!',
        detail: 'Intenta Nuevamente!!!',
      });

    }

  }

}
