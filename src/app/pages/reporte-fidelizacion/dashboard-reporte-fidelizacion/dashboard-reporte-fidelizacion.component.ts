import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment.lang('es');
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ThisReceiver } from '@angular/compiler';




@Component({
  selector: 'dashboard-reporte-fidelizacion',
  templateUrl: './dashboard-reporte-fidelizacion.component.html',
  styleUrls: ['./dashboard-reporte-fidelizacion.component.scss']
})
export class DashboardReporteFidelizacionComponent implements OnInit {

  formReporte:UntypedFormGroup;
  result:any=[];
  result1:any=[];
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}");
  spinner:boolean=false;
  reportes:any=[];
  loading: boolean = false;
  show:boolean=false;
  url1:any;



  constructor(private messageService: MessageService,private formBuilder: UntypedFormBuilder,private cors: CorsService) { 
    this.formReporte = this.formBuilder.group({
      reporte: [null, Validators.required],
      base: [null, Validators.required],
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
    this.cors
    .get('Reporte/vici1')
    .then((response) => {
      // console.log(response)
      this.result1 = response;

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

    // console.log(this.usuario)
    this.registrosReporte()

  }

  registrosReporte(){
    this.cors.get('Reporte/getRowsReporte')
    .then((response) => {
      if(response[0] != "SIN INFO"){
        // console.log(response)
        this.reportes=response

      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  dateFormat(value:any){
    if(value == null){
      return "-"
    }else{
      return moment(value).format('DD-MM-yyyy hh:mm:ss')
    }
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
        this.spinner = true;
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
            summary: 'Exito!!',
            detail: 'Datos guardados',
          });
          this.registrosReporte()
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
        this.spinner = false;
      }else{
        this.messageService.add({
          key:'tst',
          severity: 'error',
        summary: 'Faltaron campos por rellenar!',
        detail: 'Intenta Nuevamente!!!',
      });

    }

  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  descargarArchivo(archivo:string){
    this.cors.get1(`Reporte/BajarExcelFTPReporteFidelizacion`,{
      "nombre":archivo
    })
    .then((response) => {
      // console.log(response)
      this.show = true;
      this.url1 = `https://rpabackizzi.azurewebsites.net/Reporte/BajarExcelFTPReporteFidelizacion?nombre=${archivo}`;
      this.messageService.add({
        key:'tst',
        severity: 'success',
        summary: 'Se descargo el archivo',
        detail: 'Con exito!!',
      });

      
    })
    .catch((error) => {
      console.log(error)
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'No se logro descargar',
        detail: 'Intenta Nuevamente!!!',
      });
    });

  }





}
