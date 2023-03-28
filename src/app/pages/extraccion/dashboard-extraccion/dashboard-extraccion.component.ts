import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
moment.lang('es');
import { Message, MessageService } from 'primeng/api';
import { CorsService } from '@services';

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
  today = new Date();
  formExtraccion:UntypedFormGroup;
  spinner:boolean=false;

  constructor(private formBuilder: UntypedFormBuilder,private router:Router,private messageService: MessageService,private cors: CorsService) {
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

  ngOnInit(): void {
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
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","tipo":"${this.formExtraccion.controls['tipo'].value}","subtipo":"${this.formExtraccion.controls['subtipo'].value}"}]`;
        
        // var myObject = JSON.parse(data.parametrosExtraccion);
        // console.log(myObject)
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Casos de negocio"){
        // console.log("Casos de negocio")
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","numCaso":"${this.formExtraccion.controls['numCaso'].value}","cuenta":"${this.formExtraccion.controls['cuenta'].value}","categoria":"${this.formExtraccion.controls['categoria'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","subMotivo":"${this.formExtraccion.controls['subMotivo'].value}","solucion":"${this.formExtraccion.controls['solucion'].value}"}]`;
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Actividades"){
        // console.log("Actividades")
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","areaConocimiento":"${this.formExtraccion.controls['areaConocimiento'].value}","fechaAsignacion":"${this.dateFormat(this.formExtraccion.controls['fechaAsignacion'].value)}"}]`;
        
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Ordenes de servicio"){
        // console.log("Ordenes de servicio")
        // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","rpt":"${this.formExtraccion.controls['rpt'].value}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","asignada":"${this.formExtraccion.controls['asignada'].value}"}]`;
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","fechaAsignacion":"${this.dateFormat(this.formExtraccion.controls['fechaAsignacion'].value)}"}]`;
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
        this.reset()
        this.router.navigate(['/extraccion/visualizacion']);
        
      }, 2000);
      
    }else{
      
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'Faltaron campos por rellenar!',
        detail: 'Intenta Nuevamente!!!',
      });
      
    }





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
    return moment(value).format('DD-MM-yyyy hh:mm:ss')
  }
  dateFormat1(value:any){
    return moment(value).format('yyyy-MM-DDThh:mm:ss')
  }



}
