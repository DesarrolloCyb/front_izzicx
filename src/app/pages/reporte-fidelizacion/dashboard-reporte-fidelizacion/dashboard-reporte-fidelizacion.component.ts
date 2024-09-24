import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment.lang('es');
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ThisReceiver } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';




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
  archivoSeleccionado:string="";
  loading2:boolean=false;


  constructor(private httpClient: HttpClient,private messageService: MessageService,private formBuilder: UntypedFormBuilder,private cors: CorsService) { 
    this.formReporte = this.formBuilder.group({
      reporte: [null, Validators.required],
      fechaini: [null],
      fechafin: [null],
    });
    // this.cors
    // .get('Reporte/vici')
    // .then((response) => {
    //   // console.log(response)
    //   this.result = response;
    // //   this.messageService.add({
    // //     key: 'tst',
    // //     severity: 'success',
    // //     summary: 'Datos guardados',
    // //     detail: 'La solicitud de cancelacion fue guardada',
    // //   });
    // })
    // .catch((error) => {
    //   console.log(error)
    // //   this.msgs.push({
    // //     severity: 'error',
    // //     summary: 'No se logro guardar',
    // //     detail: 'La solicitud de cancelacion no fue guardada',
    // //   });
    // });
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
    setInterval(() => {
      this.registrosReporte();
  }, 600000);

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
    if(this.formReporte.valid){
        let aa = this.result1.filter((res:any)=>{
          return res.list_description == this.formReporte.value.reporte
        });
        this.spinner = true;
        let a={
          "id":0,
          "Cve_usuario": `${this.usuario.email}`,
          "list_id": `${aa[0].list_id}`,
          "archivo": "",
          "procesando": "",
          "fechaCaptura": null,
          "fechaCompletado": null,
          "status": "",
          "ip": "",
          "list_name":`${aa[0].list_name}`,
          // "FechaInicio":`${this.dateFormat1(this.formReporte.value.fechaini)}`,
          // "FechaFin":`${this.dateFormat1(this.formReporte.value.fechafin)}`
          "FechaInicio":null,
          "FechaFin":null
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

  async descargarArchivo(archivo:string){
    this.archivoSeleccionado = archivo;
    this.loading2 = true;
    // this.cors.get1(`Reporte/BajarExcelFTPReporteFidelizacion`,{
    //   "nombre":archivo
    // })
    // .then((response) => {
    //   // console.log(response)
    //   this.show = true;
    //   this.url1 = `https://rpabackizzi.azurewebsites.net/Reporte/BajarExcelFTPReporteFidelizacion?nombre=${archivo}`;
      
    //   setTimeout(()=> {
    //     this.loading2 = false;
    //     this.archivoSeleccionado = '';
    //     this.messageService.add({
    //       key:'tst',
    //       severity: 'success',
    //       summary: 'Se descargo el archivo',
    //       detail: 'Con exito!!',
    //     });
    //   }, 25000);
      
      
    // })
    // .catch((error) => {
    //   console.log(error)
    //   this.messageService.add({
    //     key:'tst',
    //     severity: 'error',
    //     summary: 'No se logro descargar',
    //     detail: 'Intenta Nuevamente!!!',
    //   });
    //   this.loading2 = false;
    //   this.archivoSeleccionado = '';
    // });

    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // Aquí agregamos los headers para evitar problemas de CORS
        'Access-Control-Allow-Origin': 'https://rpabackizzi.azurewebsites.net/', // Reemplaza con el dominio de tu frontend
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      });
      const response: any = await this.httpClient.get(`https://rpabackizzi.azurewebsites.net/Reporte/BajarExcelFTPReporteFidelizacion?nombre=${archivo}`, {
      headers:headers,  
      responseType: 'arraybuffer',
        observe: 'response'
      }).toPromise(); 
      // console.log(response)
      const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');

      link.href= URL.createObjectURL(blob);
      link.download = `${archivo}`;
      link.click();
      
      URL.revokeObjectURL(link.href);
      link.innerHTML='';
      // this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte' });
      setTimeout(()=> {
        this.loading2 = false;
        this.archivoSeleccionado = '';
        this.messageService.add({
          key:'tst',
          severity: 'success',
          summary: 'Se descargo el archivo',
          detail: 'Con exito!!',
        });
      }, 5000);

    } catch (error) {
      console.log(error)
    }







    this.show=false

    
  }
  estaSiendoDescargado(archivo: string): boolean {
    return this.archivoSeleccionado === archivo && this.loading2;
  }

  dateFormat1(value:any){
    // console.log(value)
    if(value != null){
      return moment(value).format('yyyy-MM-DDThh:mm:00')
    }else{
      return ""
    }
  }




}
