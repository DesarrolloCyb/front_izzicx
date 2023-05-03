import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
moment.lang('es');
import { Message, MessageService } from 'primeng/api';
import { CorsService } from '@services';
import { Table } from 'primeng/table';


@Component({
  selector: 'dashboard-extraccion',
  templateUrl: './dashboard-extraccion.component.html',
  styleUrls: ['./dashboard-extraccion.component.scss']
})
export class DashboardExtraccionComponent implements OnInit {

  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
  tipoExtraccion:string[]=[
    'Cuenta',
    'Casos de negocio',
    'Actividades',
    'Ordenes de servicio'
  ]; 
  formExtraccion:UntypedFormGroup;
  spinner:boolean=false;
  datosExtraccion:any[]=[];
  loading: boolean = false
  show:boolean=false;
  url1:any;

  constructor(private formBuilder: UntypedFormBuilder,private router:Router,private messageService: MessageService,private cors: CorsService) {
    this.tablaExtraccion();
    this.formExtraccion = this.formBuilder.group({
      tipoExtraccion: [null, Validators.required],
      fechaini: [null],
      fechafin: [null],

      estado: [null],
      tipo: [null],
      subtipo: [null],
      canalIngreso: [null],
      
      numCaso: [null],
      cuenta: [null],
      categoria: [null],
      motivo: [null],
      subMotivo: [null],
      solucion: [null],

      areaConocimiento: [null],
      fechaAsignacion: [null],
      
      rpt: [null],
      tipoOrden: [null],
      asignada: [null],

    });

  }

  ngOnInit(): any {
    setInterval(() => {
      this.tablaExtraccion();
    }, 5000);
    
  }

  reset(){
    this.formExtraccion.reset()
  }

  Enviar(){
    this.formExtraccion.markAllAsTouched();
    if(this.formExtraccion.valid){
      this.spinner = true;
      let data ={
        "id": 0,
        "cve_usuario": `${this.usuario.email}`,
        "tipoExtraccion":`${this.formExtraccion.controls['tipoExtraccion'].value}`,
        "fechaCompletado": null,
        "status": "",
        "fechaCaptura": null,
        "ip": "",
        "parametrosExtraccion":"",
        "fechaInicial":null,
        "fechaFinal":null,
        "procesando": "",
        "fechaExtraccion": null,
        "archivo": ""
      };
      if(this.formExtraccion.controls['tipoExtraccion'].value === "Cuenta"){
        // console.log("Esto es Cuenta")
        // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","tipo":"${this.formExtraccion.controls['tipo'].value}","subtipo":"${this.formExtraccion.controls['subtipo'].value}","canalIngreso":"${this.formExtraccion.controls['canalIngreso'].value}"}]`;
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","tipo":"${this.formExtraccion.controls['tipo'].value ? this.formExtraccion.controls['tipo'].value :""}","subtipo":"${this.formExtraccion.controls['subtipo'].value ? this.formExtraccion.controls['subtipo'].value :""}"}]`;
        
        // var myObject = JSON.parse(data.parametrosExtraccion);
        // console.log(myObject)
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Casos de negocio"){
        // console.log("Casos de negocio")
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","numCaso":"${this.formExtraccion.controls['numCaso'].value ? this.formExtraccion.controls['numCaso'].value : ""}","cuenta":"${this.formExtraccion.controls['cuenta'].value ? this.formExtraccion.controls['cuenta'].value :""}","categoria":"${this.formExtraccion.controls['categoria'].value ? this.formExtraccion.controls['categoria'].value :""}","motivo":"${this.formExtraccion.controls['motivo'].value ? this.formExtraccion.controls['motivo'].value:""}","subMotivo":"${this.formExtraccion.controls['subMotivo'].value ? this.formExtraccion.controls['subMotivo'].value :""}","solucion":"${this.formExtraccion.controls['solucion'].value ? this.formExtraccion.controls['solucion'].value :""}"}]`;
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Actividades"){
        // console.log("Actividades")
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","areaConocimiento":"${this.formExtraccion.controls['areaConocimiento'].value ? this.formExtraccion.controls['areaConocimiento'].value :""}","fechaAsignacion":">='${this.formExtraccion.controls['fechaAsignacion'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaAsignacion'].value[0]):null }' AND <= '${this.formExtraccion.controls['fechaAsignacion'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaAsignacion'].value[1]):null}'"}]`;
        
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Ordenes de servicio"){
        // console.log("Ordenes de servicio")
        // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","rpt":"${this.formExtraccion.controls['rpt'].value}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","asignada":"${this.formExtraccion.controls['asignada'].value}"}]`;
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value ? this.formExtraccion.controls['tipoOrden'].value :""}","motivo":"${this.formExtraccion.controls['motivo'].value ? this.formExtraccion.controls['motivo'].value:""}","areaConocimiento":"${this.formExtraccion.controls['areaConocimiento'].value ? this.formExtraccion.controls['areaConocimiento'].value :""}","fechaAsignacion":">='${this.formExtraccion.controls['fechaAsignacion'].value ? this.dateFormat(this.formExtraccion.controls['fechaAsignacion'].value[0]):null }' AND <= '${this.formExtraccion.controls['fechaAsignacion'].value ? this.dateFormat(this.formExtraccion.controls['fechaAsignacion'].value[1]):null}'"}]`;
      }
      // console.log(data)
      this.cors.post('Reporte/GuardarFormularioEjecucionExtraccion',data)
      .then((response) => {
        // console.log(response)
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: 'Exito!!!',
          detail: 'Datos guardados',
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
      
      setTimeout(() => {
        this.spinner = false;
        this.tablaExtraccion();
        this.reset()
        // this.router.navigate(['/extraccion/visualizacion']);
        
      }, 3000);
      
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


  clearValidators(){
    this.formExtraccion.controls['estado'].reset();
    this.formExtraccion.controls['tipo'].reset();
    this.formExtraccion.controls['subtipo'].reset();
    this.formExtraccion.controls['canalIngreso'].reset();
    this.formExtraccion.controls['numCaso'].reset();
    this.formExtraccion.controls['cuenta'].reset();
    this.formExtraccion.controls['categoria'].reset();
    this.formExtraccion.controls['motivo'].reset();
    this.formExtraccion.controls['subMotivo'].reset();
    this.formExtraccion.controls['solucion'].reset();
    this.formExtraccion.controls['areaConocimiento'].reset();
    this.formExtraccion.controls['fechaAsignacion'].reset();
    this.formExtraccion.controls['rpt'].reset();
    this.formExtraccion.controls['tipoOrden'].reset();
    this.formExtraccion.controls['asignada'].reset();

    this.formExtraccion.get('estado')?.clearValidators();
    this.formExtraccion.get('estado')?.updateValueAndValidity();
    this.formExtraccion.get('tipo')?.clearValidators();
    this.formExtraccion.get('tipo')?.updateValueAndValidity();
    this.formExtraccion.get('subtipo')?.clearValidators();
    this.formExtraccion.get('subtipo')?.updateValueAndValidity();
    this.formExtraccion.get('canalIngreso')?.clearValidators();
    this.formExtraccion.get('canalIngreso')?.updateValueAndValidity();
    this.formExtraccion.get('numCaso')?.clearValidators();
    this.formExtraccion.get('numCaso')?.updateValueAndValidity();
    this.formExtraccion.get('cuenta')?.clearValidators();
    this.formExtraccion.get('cuenta')?.updateValueAndValidity();
    this.formExtraccion.get('categoria')?.clearValidators();
    this.formExtraccion.get('categoria')?.updateValueAndValidity();
    this.formExtraccion.get('motivo')?.clearValidators();
    this.formExtraccion.get('motivo')?.updateValueAndValidity();
    this.formExtraccion.get('subMotivo')?.clearValidators();
    this.formExtraccion.get('subMotivo')?.updateValueAndValidity();
    this.formExtraccion.get('solucion')?.clearValidators();
    this.formExtraccion.get('solucion')?.updateValueAndValidity();
    this.formExtraccion.get('areaConocimiento')?.clearValidators();
    this.formExtraccion.get('areaConocimiento')?.updateValueAndValidity();
    this.formExtraccion.get('fechaAsignacion')?.clearValidators();
    this.formExtraccion.get('fechaAsignacion')?.updateValueAndValidity();
    this.formExtraccion.get('rpt')?.clearValidators();
    this.formExtraccion.get('rpt')?.updateValueAndValidity();
    this.formExtraccion.get('tipoOrden')?.clearValidators();
    this.formExtraccion.get('tipoOrden')?.updateValueAndValidity();
    this.formExtraccion.get('asignada')?.clearValidators();
    this.formExtraccion.get('asignada')?.updateValueAndValidity();

  };

  cambioOrdenServicio(event:any){
    this.clearValidators();
    if(event ==="Cuenta"){
      this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      this.formExtraccion.get('estado')?.updateValueAndValidity();
      this.formExtraccion.get('tipo')?.setValidators([Validators.required]);
      this.formExtraccion.get('tipo')?.updateValueAndValidity();
      this.formExtraccion.get('subtipo')?.setValidators([Validators.required]);
      this.formExtraccion.get('subtipo')?.updateValueAndValidity();
      this.formExtraccion.get('canalIngreso')?.setValidators([Validators.required]);
      this.formExtraccion.get('canalIngreso')?.updateValueAndValidity();
    }else if(event ==="Casos de negocio"){
      this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      this.formExtraccion.get('estado')?.updateValueAndValidity();
      this.formExtraccion.get('numCaso')?.setValidators([Validators.required]);
      this.formExtraccion.get('numCaso')?.updateValueAndValidity();
      this.formExtraccion.get('cuenta')?.setValidators([Validators.required]);
      this.formExtraccion.get('cuenta')?.updateValueAndValidity();
      this.formExtraccion.get('categoria')?.setValidators([Validators.required]);
      this.formExtraccion.get('categoria')?.updateValueAndValidity();
      this.formExtraccion.get('motivo')?.setValidators([Validators.required]);
      this.formExtraccion.get('motivo')?.updateValueAndValidity();
      this.formExtraccion.get('subMotivo')?.setValidators([Validators.required]);
      this.formExtraccion.get('subMotivo')?.updateValueAndValidity();
      this.formExtraccion.get('solucion')?.setValidators([Validators.required]);
      this.formExtraccion.get('solucion')?.updateValueAndValidity();

    }else if(event ==="Actividades"){
      this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      this.formExtraccion.get('estado')?.updateValueAndValidity();
      this.formExtraccion.get('areaConocimiento')?.setValidators([Validators.required]);
      this.formExtraccion.get('areaConocimiento')?.updateValueAndValidity();
      this.formExtraccion.get('fechaAsignacion')?.setValidators([Validators.required]);
      this.formExtraccion.get('fechaAsignacion')?.updateValueAndValidity();

    }else if(event ==="Ordenes de servicio"){
      this.formExtraccion.get('motivo')?.setValidators([Validators.required]);
      this.formExtraccion.get('motivo')?.updateValueAndValidity();
      this.formExtraccion.get('rpt')?.setValidators([Validators.required]);
      this.formExtraccion.get('rpt')?.updateValueAndValidity();
      this.formExtraccion.get('tipoOrden')?.setValidators([Validators.required]);
      this.formExtraccion.get('tipoOrden')?.updateValueAndValidity();
      this.formExtraccion.get('asignada')?.setValidators([Validators.required]);
      this.formExtraccion.get('asignada')?.updateValueAndValidity();
      this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      this.formExtraccion.get('estado')?.updateValueAndValidity();

    }
  }
  dateFormat(value:any){
    // console.log(value)
    if(value != null){
      return moment(value).format('DD/MM/yyyy hh:mm:00')
    }else{
      return ""
    }
  }

  dateFormatDate(value:any){
    // console.log(value)
    if(value != null){
      return moment(value).format('DD/MM/yyyy')
    }else{
      return ""
    }
  }

  dateFormat1(value:any){
    return moment(value).format('yyyy-MM-DDThh:mm:ss')
  }

  tablaExtraccion(){
    // console.log("Tabla Extraccion")
    this.cors.get('Reporte/getmostrarTablaExtraccion',{})
    .then((response) => {
      // console.log(response)
      this.datosExtraccion = response;
    })
    .catch((error) => {
      console.log(error)
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'No se logro mostrar los datos',
        detail: 'Intenta Nuevamente!!!',
      });
    });
  }

  descargarArchivo(archivo:string){
    this.cors.get1(`Reporte/BajarExtraccionExcelFTP`,{
      "nombre":archivo
    })
    .then((response) => {
      // console.log(response)
      this.show = true;
      this.url1 = `https://rpabackizzi.azurewebsites.net/Reporte/BajarExtraccionExcelFTP?nombre=${archivo}`;
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
