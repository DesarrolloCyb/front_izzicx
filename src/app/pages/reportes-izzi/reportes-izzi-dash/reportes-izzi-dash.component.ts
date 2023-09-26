import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import { CorsService } from '@services';
import { Message,MessageService,ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    private httpClient: HttpClient
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
      accept: async () => {
        this.button=true;
        // this.show = false;
        // console.log(this.formReporte)
        let fechaini = moment(this.formReporte.value.fechas[0]).format('YYYY-MM-DD');
        let fechafin = moment(this.formReporte.value.fechas[1]).format('YYYY-MM-DD');
        let url=``;
        let para =``;
        let a = {
          "fecha1":fechaini,
          "fecha2":fechafin
        }
        let nomArchivo="";
        // console.log(a)
        console.log(this.formReporte.value)
        if(this.formReporte.value.tipoReporte =='Ajustes (Cobranza y Late fee)'){
          console.log("Ajustes (Cobranza y Late fee)")
          url = `ReportesIzzi/getReporteAjustesCasoNegocioCobranza`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`;
          nomArchivo="Reporte_Ajustes_Cobranza_Late_Fee"
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='Depuracion OS'){
          console.log("Depuracion OS")
          url = `ReportesIzzi/getReporteDepuracionOS`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          nomArchivo="Reporte_Depuracion_OS"
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='NotDone'){
          console.log("NotDone")
          url = `ReportesIzzi/getReporteAjustesNotDone`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          nomArchivo="Reporte_NotDone"
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='Ajustes Sucursales'){
          console.log("Ajustes Sucursales")
          url = `ReportesIzzi/getReporteAjustesCambioServicios`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          nomArchivo="Reporte_Ajustes_Sucursales"
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='Ajustes Sin Validacion'){
          console.log("Ajustes Sin Validacion")
          url = `ReportesIzzi/getReporteAjustesCasoNegocioCobranzaSinValidacion`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          nomArchivo="Reporte_Ajustes_CN_Cobranza_SinValidacion"
          // console.log(`${url}?${para}`)
        }else if(this.formReporte.value.tipoReporte =='NotDone Sin Validacion'){
          console.log("NotDone Sin Validacion")
          url = `ReportesIzzi/getReporteAjustesNotDoneSinValidacion`;
          para =`fecha1=${fechaini}&fecha2=${fechafin}`
          nomArchivo="Reporte_NotDone_SinValidacion"
          // console.log(`${url}?${para}`)
        }
        // this.cors.get1(`${url}`,a).then((response) => {
        //   this.show = true;
        //   this.url1 = `https://rpabackizzi.azurewebsites.net/${url}?${para}`;
        //   this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte' });
        //   this.button=false;
          
        // }).catch((error) => {
        //   console.log("Error",error)
        //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Intentalo mas tarde nuevamente!!!' });
        //   this.button=false;
        // })


        
        try {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Aquí agregamos los headers para evitar problemas de CORS
            'Access-Control-Allow-Origin': 'https://rpabackizzi.azurewebsites.net/', // Reemplaza con el dominio de tu frontend
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          });
          const response: any = await this.httpClient.get(`https://rpabackizzi.azurewebsites.net/${url}?${para}`, {
          headers:headers,  
          responseType: 'arraybuffer',
            observe: 'response'
          }).toPromise(); 
          // console.log(response)
          const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const link = document.createElement('a');

          link.href= URL.createObjectURL(blob);
          link.download = `${nomArchivo}`;
          link.click();
          
          URL.revokeObjectURL(link.href);
          link.innerHTML='';
          this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte' });

        } catch (error) {
          console.log(error)
        }

        // try {
        //   const response: any = await this.httpClient.get(`https://rpabackizzi.azurewebsites.net/${url}?${para}`, {
        //   headers:headers,  
        //   responseType: 'arraybuffer',
        //     observe: 'response' // Añade esta opción para obtener la respuesta completa
        //   }).toPromise();
        //   console.log(response)
        //   const blob = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
        //   // Crea una URL temporal para el Blob
        //   const blobUrl = URL.createObjectURL(blob);
    
        //   // Abre una ventana emergente para la descarga
        //   const newWindow = window.open(blobUrl, '_blank');
        //   if (newWindow) {
        //     newWindow.focus();
        //   } else {
        //     console.error('No se pudo abrir la ventana emergente');
        //   }
    
        //   // Revoca la URL temporal
        //   URL.revokeObjectURL(blobUrl);
          
        // } catch (error) {
        //   console.log(error)
        // }

        
      //   try {
      //   const response: any = await this.httpClient.get(`https://rpabackizzi.azurewebsites.net/${url}?${para}`, {
      //     headers: headers,
      //     responseType: 'blob',
      //     observe: 'response'
      //   }).toPromise();

      //   // Extraer el nombre del archivo del encabezado "Content-Disposition"
      //   // const contentDispositionHeader = response.headers.get('content-disposition');
      //   // const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      //   // const matches = fileNameRegex.exec(contentDispositionHeader);
      //   // const fileName = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : 'Reporte_NotDone.xlsx';

      //   // Guardar el Blob como archivo con el nombre extraído
      //   saveAs(response.body, "preubaX");
      // } catch (error) {
      //   console.error('Error al descargar el archivo:', error);
      // }






        this.button = false
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
