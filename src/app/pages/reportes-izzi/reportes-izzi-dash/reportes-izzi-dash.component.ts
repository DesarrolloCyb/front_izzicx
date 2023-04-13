import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import { CorsService } from '@services';
import { Message,MessageService,ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as moment from 'moment';

@Component({
  selector: 'reportes-izzi-dash',
  templateUrl: './reportes-izzi-dash.component.html',
  styleUrls: ['./reportes-izzi-dash.component.scss'],
  providers: [ConfirmationService, MessageService]

})
export class ReportesIzziDashComponent implements OnInit {
  formReporte:UntypedFormGroup;
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
  msgs: Message[] = [];
  mostrandoResultados: boolean = false
  reportes:any = [];

  constructor(
    private cors: CorsService,
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
  ) { 
    this.formReporte = this.formBuilder.group({
      tipoReporte: [null, Validators.required],
      fechas: [null, Validators.required],
      Cve_usuario: [this.usuario.email, Validators.required],
    });

  }

  ngOnInit(): void {
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: '¿Los datos son correctos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(this.formReporte)
        // let tipoR = this.selectedDrop;
        // let fechaini = moment(this.rangeDates[0]).format('YYYY-MM-DD');
        // let fechafin = moment(this.rangeDates[1]).format('YYYY-MM-DD');
        // let url=``;
        // let tipoo ="";
        // // let para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`;
        // let para =``;
        // if(tipoR =='Single Video'){
        //   console.log("Single Video")
        //   url = `Reports/getReport`;
        //   tipoo ="Single Video"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Modem Combo'){
        //   console.log('Modem Combo')
        //   url = `Reports/getReport`;
        //   tipoo ="Modem Combo"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'BTC Combo'){
        //   console.log('BTC Combo')
        //   url = `Reports/getReport`;
        //   tipoo ="BTCel Combo"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Equipos Adicionales'){
        //   console.log('Equipos Adicionales')
        //   url = `Reports/getReport`;
        //   tipoo ="Equipos Adicionales"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Llenado de Solicitud de Cancelación'){
        //   console.log('Llenado de Solicitud de Cancelación')
        //   url = `Reports/getReport2`;
        //   tipoo ="Cancelado"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Llenado de Cancelación de Retenidos'){
        //   console.log('Llenado de Cancelación de Retenidos')
        //   url = `Reports/getReport2`;
        //   tipoo ="Retenido"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'NFL Temporadas'){
        //   console.log('NFL Temporadas')
        //   url = `Reports/getReportTemporada`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Servicios con/sin Costo'){
        //   console.log('Servicios con/sin Costo')
        //   url = `Reports/getReportServicios`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Reactivacion'){
        //   console.log('Reactivacion')
        //   url = `Reports/getReportReactivacion`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Reembolso'){
        //   console.log('Reembolso')
        //   url = `Reports/getReportReembolso`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Combo BTI VeTV'){
        //   console.log('Combo BTI VeTV')
        //   url = `Reports/getReport`;
        //   tipoo ="Combo BTI VeTV"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'Equipo Adicional VeTV'){
        //   console.log('Equipo Adicional VeTV')
        //   url = `Reports/getReport`;
        //   tipoo ="Equipo Adicional VeTV"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`

        // }else if(tipoR == 'BTCel Combo VeTV'){
        //   console.log('BTCel Combo VeTV')
        //   url = `Reports/getReport`;
        //   tipoo ="BTCel Combo VeTV"
        //   para =`tipo=${tipoo}&fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Reporte General'){
        //   console.log('Reporte General')
        //   url = `Reports/getReportGenral`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Cambio de Esquema'){
        //   console.log('Cambio de Esquema')
        //   url = `Reports/getReportEsquema`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Cambio de Paquete'){
        //   console.log('Cambio de Paquete')
        //   url = `Reports/getReportPaquete`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Bolsa de Datos'){
        //   console.log('Bolsa de Datos')
        //   url = `Reports/getReportBolsaDatos`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Garantia'){
        //   console.log('Garantia')
        //   url = `Reports/getReportGarantia`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Beneficios'){
        //   console.log('Beneficios')
        //   url = `Reports/getReportBeneficios`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'GarantiaCARD'){
        //   console.log('Garantia CARD')
        //   url = `Reports/getReportGarantiaCARD`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Cobranza Cerrado'){
        //   console.log('Cobranza Cerrado')
        //   url = `Reports/getReportCobranzaCerrado`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }else if(tipoR == 'Cobranza No Procede'){
        //   console.log('Cobranza No Procede')
        //   url = `Reports/getReportCobranzaProcede`;
        //   para =`fecha1=${fechaini}&fecha2=${fechafin}`
        // }
        // // console.log(tipoR)
        // // console.log(`${url}?${para}`)
        // this.cors.get1(`${url}`,para).then((response) => {
        //   this.show = true;
        //   this.url1 = `https://10.251.58.11/api/${url}?${para}`;
        //   this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte' });
  
        // }).catch((error) => {
        //   console.log("Error",error)
        // })
    
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Reporte Cancelado' });
        }
    });
}


}
