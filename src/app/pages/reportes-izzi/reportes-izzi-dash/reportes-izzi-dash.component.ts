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
        // console.log(this.formReporte)
        let fechaini = moment(this.formReporte.value.fechas[0]).format('YYYY-MM-DD');
        let fechafin = moment(this.formReporte.value.fechas[1]).format('YYYY-MM-DD');
        let url=``;
        let para =``;
        let a = {
          "fecha1":fechaini,
          "fecha2":fechafin
        }
        if(this.formReporte.value.tipoReporte =='Extraccion'){
          console.log("Extraccion")
          url = `ReportesIzzi/getReporteExtraccion`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          // console.log(`${url}?${para}`)
        }
        this.cors.get1(`${url}`,a).then((response) => {
          this.show = true;
          this.url1 = `https://rpabackizzi.azurewebsites.net/${url}?${para}`;
          this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte' });
  
        }).catch((error) => {
          console.log("Error",error)
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
