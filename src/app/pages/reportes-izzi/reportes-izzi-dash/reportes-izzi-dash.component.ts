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
  url1:string='';
  show:boolean=false;
  button:boolean=false;

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
    this.getTipoReporte();
  }
  
  confirm2(event: Event) {
    this.confirmationService.confirm({
      key: 'confirm2',
      target: event.target || new EventTarget,
      message: '¿Los datos son correctos?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.button=true;
        
        // console.log(this.formReporte)
        let fechaini = moment(this.formReporte.value.fechas[0]).format('YYYY-MM-DD');
        let fechafin = moment(this.formReporte.value.fechas[1]).format('YYYY-MM-DD');
        let url=``;
        let para =``;
        let a = {
          "fecha1":fechaini,
          "fecha2":fechafin
        }
        // console.log(a)
        if(this.formReporte.value.tipoReporte =='Ajustes Cobranza'){
          console.log("Ajustes Cobranza")
          url = `ReportesIzzi/getReporteAjustesCasoNegocioCobranza`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='Depuracion OS'){
          console.log("Depuracion OS")
          url = `ReportesIzzi/getReporteDepuracionOS`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='NotDone'){
          console.log("NotDone")
          url = `ReportesIzzi/getReporteAjustesNotDone`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='Ajustes Cambio Servicio'){
          console.log("Ajustes Cambio Servicio")
          url = `ReportesIzzi/getReporteAjustesCambioServicios`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          // console.log(`${url}?${para}`)
        }
        this.cors.get1(`${url}`,a).then((response) => {
          this.show = true;
          this.url1 = `https://rpabackizzi.azurewebsites.net/${url}?${para}`;
          this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte' });
          this.button=false;
          
        }).catch((error) => {
          console.log("Error",error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Intentalo mas tarde nuevamente!!!' });
          this.button=false;
        })
        this.formReporte.controls['tipoReporte'].reset();
        this.formReporte.controls['fechas'].reset();
        this.show = false;
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Reporte Cancelado' });
      }
    });
    
    
  }

  getTipoReporte(){
    this.cors.get('ReportesIzzi/getTipoReportes').then((response) => {
      if(response[0]=='SIN INFO'){
        this.reportes=[];
      }else{
        this.reportes=response;
      }
    }).catch((error) => {
      console.log("Error",error)
    })
  }
  








}
