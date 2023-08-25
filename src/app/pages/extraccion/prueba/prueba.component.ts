import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
moment.lang('es');
import { Message, MessageService } from 'primeng/api';
import { CorsService } from '@services';
import { Table } from 'primeng/table';

import { HttpClient } from '@angular/common/http';

import { nanoid } from 'nanoid';


@Component({
  selector: 'prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
  tipoExtraccion:string[]=[
    'Casos de negocio',
    'Actividades',
    'Ordenes de servicio',
  ]; 
  formExtraccion:UntypedFormGroup;
  spinner:boolean=false;
  datosExtraccion:any[]=[];
  datosExtraccion2:any[]=[];
  loading: boolean = false
  show:boolean=false;
  url1:any;
  archivoSeleccionado:string="";
	loading2:boolean=false;
  modal:boolean=false;
  nuevaHora:string="";
  id:string="";
  horas:any[]=[
    {
      label:"00:00:00",
      value:0
    },
    {
      label:"01:00:00",
      value:1
    },
    {
      label:"02:00:00",
      value:2
    },
    {
      label:"03:00:00",
      value:3
    },
    {
      label:"04:00:00",
      value:4
    },
    {
      label:"05:00:00",
      value:5
    },
    {
      label:"06:00:00",
      value:6
    },
    {
      label:"07:00:00",
      value:7
    },
    {
      label:"08:00:00",
      value:8
    },
    {
      label:"09:00:00",
      value:9
    },
    {
      label:"10:00:00",
      value:10
    },
    {
      label:"11:00:00",
      value:11
    },
    {
      label:"12:00:00",
      value:12
    },
    {
      label:"13:00:00",
      value:13
    },
    {
      label:"14:00:00",
      value:14
    },
    {
      label:"15:00:00",
      value:15
    },
    {
      label:"16:00:00",
      value:16
    },
    {
      label:"17:00:00",
      value:17
    },
    {
      label:"18:00:00",
      value:18
    },
    {
      label:"19:00:00",
      value:19
    },
    {
      label:"20:00:00",
      value:20
    },
    {
      label:"21:00:00",
      value:21
    },
    {
      label:"22:00:00",
      value:22
    },
    {
      label:"23:00:00",
      value:23
    },
  ];
  min:any[]=[];
  categories: any[] = [
    { name: 'Dias del Mes', key: 'DM' },
    { name: 'Dias de la Semana', key: 'DS' },
  ];
  diasemanas:any[]=[
    {
      label:"Domingo",
      value:1
    },
    {
      label:"Lunes",
      value:2
    },
    {
      label:"Martes",
      value:3
    },
    {
      label:"Miercoles",
      value:4
    },
    {
      label:"Jueves",
      value:5
    },
    {
      label:"Viernes",
      value:6
    },
    {
      label:"Sabado",
      value:7
    },
  ];
  h="";
  m="";
  d="";
  

  constructor(private formBuilder: UntypedFormBuilder,private router:Router,private messageService: MessageService,private cors: CorsService, private http: HttpClient) {
    this.formExtraccion = this.formBuilder.group({
      tipoExtraccion: [null, Validators.required],

      estado: [null],
      tipo: [null],
      subtipo: [null],
      canalIngreso: [null],
      
      fechaApertura:[null],
      cuenta: [null],
      medioContacto: [null],
      casoNegocio: [null],
      categoria: [null],
      motivo: [null],
      subMotivo: [null],
      solucion: [null],
      motivoCliente: [null],

      areaConocimiento: [null],
      fechaAsignacion: [null],
      vencimientoActividad: [null],
      fechaCreacion: [null],
      
      compania: [null],
      telefonos: [null],
      numOrden: [null],
      tipoOrden: [null],
      fechaOrden: [null],
      
      numPago: [null],
      fechaPago: [null],
      importe: [null],
      formaPago: [null],
      ultimaActualizacion: [null],
      
      vencimiento: [null],
      FallaGeneralAsociada: [null],
      tecnologia: [null],
      hub: [null],
      rama: [null],
      nodo: [null],
      fiberDeep: [null],
      fechaInicio: [null],
      nombreHub: [null],
      Incidente: [null],

      horaProgramacion:[null],

      hora:[null],
      minuto:[null,Validators.required],
      diasSemana:[null,Validators.required],

    });

    for(let i=0;i<60;i++){
      let a=null;
      if(i<10){
         a = {
          label:`00:0${i}:00`,
          value:i
        }
      }else{
        a = {
          label:`00:${i}:00`,
          value:i
        }
      }
      this.min.push(a);
    }


   }

  ngOnInit(): void {
    this.tablaExtraccion();
    this.tablaExtraccion2();
    setInterval(() => {
      this.tablaExtraccion();
      this.tablaExtraccion2();
    }, 5000);
  }


  reset(){
    this.formExtraccion.reset()
    this.d="";
    this.h="";
    this.m="";
  }

  Enviar(){
    this.formExtraccion.markAllAsTouched();
    // console.log(this.formExtraccion)
    if(this.formExtraccion.valid){
      this.spinner = true;
      const randomId = nanoid();
      let data ={
        "id": 0,
        "cve_usuario": `${this.usuario.email}`,
        "tipoExtraccion":`${this.formExtraccion.controls['tipoExtraccion'].value}`,
        "fechaCompletado": null,
        "status": "",
        "ip": "",
        "parametrosExtraccion":"",
        "procesando": "",
        "fechaExtraccion": null,
        "archivo": "",
        "horaProgramacion": "",
        "nombreCron":`${this.formExtraccion.controls['tipoExtraccion'].value}_${randomId}`,
        "scheduleExpression":"",
      };
      if(this.formExtraccion.controls['tipoExtraccion'].value === "Cuenta"){
        // console.log("Esto es Cuenta")
        // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value}","tipo":"${this.formExtraccion.controls['tipo'].value}","subtipo":"${this.formExtraccion.controls['subtipo'].value}","canalIngreso":"${this.formExtraccion.controls['canalIngreso'].value}"}]`;
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","tipo":"${this.formExtraccion.controls['tipo'].value ? this.formExtraccion.controls['tipo'].value :""}","subtipo":"${this.formExtraccion.controls['subtipo'].value ? this.formExtraccion.controls['subtipo'].value :""}","canalIngreso":"${this.formExtraccion.controls['canalIngreso'].value ? this.formExtraccion.controls['canalIngreso'].value : ""}"}]`;
        
        // var myObject = JSON.parse(data.parametrosExtraccion);
        // console.log(myObject)
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Casos de negocio"){
        // console.log("Casos de negocio")
        data.parametrosExtraccion =`[{"fechaApertura":">='${this.formExtraccion.controls['fechaApertura'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaApertura'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['fechaApertura'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaApertura'].value[1]):"null"}'","estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","cuenta":"${this.formExtraccion.controls['cuenta'].value ? this.formExtraccion.controls['cuenta'].value :""}","medioContacto":"${this.formExtraccion.controls['medioContacto'].value ? this.formExtraccion.controls['medioContacto'].value :""}","casoNegocio":"${this.formExtraccion.controls['casoNegocio'].value ? this.formExtraccion.controls['casoNegocio'].value :""}","categoria":"${this.formExtraccion.controls['categoria'].value ? this.formExtraccion.controls['categoria'].value :""}","motivo":"${this.formExtraccion.controls['motivo'].value ? this.formExtraccion.controls['motivo'].value:""}","subMotivo":"${this.formExtraccion.controls['subMotivo'].value ? this.formExtraccion.controls['subMotivo'].value :""}","solucion":"${this.formExtraccion.controls['solucion'].value ? this.formExtraccion.controls['solucion'].value :""}","motivoCliente":"${this.formExtraccion.controls['motivoCliente'].value ? this.formExtraccion.controls['motivoCliente'].value :""}"}]`;
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Actividades"){
        // console.log("Actividades")
        data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","areaConocimiento":"${this.formExtraccion.controls['areaConocimiento'].value ? this.formExtraccion.controls['areaConocimiento'].value :""}","fechaAsignacion":">='${this.formExtraccion.controls['fechaAsignacion'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaAsignacion'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['fechaAsignacion'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaAsignacion'].value[1]):"null"}'","tipo":"${this.formExtraccion.controls['tipo'].value ? this.formExtraccion.controls['tipo'].value : ""}","vencimientoActividad":">='${this.formExtraccion.controls['vencimientoActividad'].value ? this.dateFormatDate(this.formExtraccion.controls['vencimientoActividad'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['vencimientoActividad'].value ? this.dateFormatDate(this.formExtraccion.controls['vencimientoActividad'].value[1]):"null"}'","fechaCreacion":">='${this.formExtraccion.controls['fechaCreacion'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaCreacion'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['fechaCreacion'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaCreacion'].value[1]):"null"}'"}]`;
        
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Ordenes de servicio"){
        // console.log("Ordenes de servicio")
        // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","rpt":"${this.formExtraccion.controls['rpt'].value}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","asignada":"${this.formExtraccion.controls['asignada'].value}"}]`;
        data.parametrosExtraccion =`[{"cuenta":"${this.formExtraccion.controls['cuenta'].value ? this.formExtraccion.controls['cuenta'].value : ""}","compania":"${this.formExtraccion.controls['compania'].value ? this.formExtraccion.controls['compania'].value :""}","telefonos":"${this.formExtraccion.controls['telefonos'].value ? this.formExtraccion.controls['telefonos'].value :""}","numOrden":"${this.formExtraccion.controls['numOrden'].value ? this.formExtraccion.controls['numOrden'].value :""}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value ? this.formExtraccion.controls['tipoOrden'].value :""}","fechaOrden":">='${this.formExtraccion.controls['fechaOrden'].value ? this.dateFormat(this.formExtraccion.controls['fechaOrden'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['fechaOrden'].value ? this.dateFormat(this.formExtraccion.controls['fechaOrden'].value[1]):"null"}'","estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value :""}"}]`;
      }else if(this.formExtraccion.controls['tipoExtraccion'].value === "Pagos"){
        // console.log("Ordenes de servicio")
        // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","rpt":"${this.formExtraccion.controls['rpt'].value}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","asignada":"${this.formExtraccion.controls['asignada'].value}"}]`;
        data.parametrosExtraccion =`[{"numPago":"${this.formExtraccion.controls['numPago'].value ? this.formExtraccion.controls['numPago'].value : ""}","fechaPago":"${this.formExtraccion.controls['fechaPago'].value ? this.dateFormat(this.formExtraccion.controls['fechaPago'].value) :""}","importe":"${this.formExtraccion.controls['importe'].value ? this.formExtraccion.controls['importe'].value :""}","fechaPago":">='${this.formExtraccion.controls['fechaPago'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaPago'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['fechaPago'].value ? this.dateFormatDate(this.formExtraccion.controls['fechaPago'].value[1]):"null"}'","estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value :""}","ultimaActualizacion":">='${this.formExtraccion.controls['ultimaActualizacion'].value ? this.dateFormatDate(this.formExtraccion.controls['ultimaActualizacion'].value[0]):"null" }' AND <= '${this.formExtraccion.controls['ultimaActualizacion'].value ? this.dateFormatDate(this.formExtraccion.controls['ultimaActualizacion'].value[1]):"null"}'",}]`;
      }
      // else if(this.formExtraccion.controls['tipoExtraccion'].value === "Fallas generales"){
      //   // console.log("Ordenes de servicio")
      //   // data.parametrosExtraccion =`[{"estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value : ""}","rpt":"${this.formExtraccion.controls['rpt'].value}","tipoOrden":"${this.formExtraccion.controls['tipoOrden'].value}","motivo":"${this.formExtraccion.controls['motivo'].value}","asignada":"${this.formExtraccion.controls['asignada'].value}"}]`;
      //   data.parametrosExtraccion =`[{"vencimiento":"${this.formExtraccion.controls['vencimiento'].value ? this.formExtraccion.controls['vencimiento'].value : ""}","FallaGeneralAsociada":"${this.formExtraccion.controls['FallaGeneralAsociada'].value ? this.formExtraccion.controls['FallaGeneralAsociada'].value :""}","categoria":"${this.formExtraccion.controls['categoria'].value ? this.formExtraccion.controls['categoria'].value :""}","motivo":"${this.formExtraccion.controls['motivo'].value ? this.formExtraccion.controls['motivo'].value :""}","subMotivo":"${this.formExtraccion.controls['subMotivo'].value ? this.formExtraccion.controls['subMotivo'].value :""}","solucion":"${this.formExtraccion.controls['solucion'].value ? this.formExtraccion.controls['solucion'].value:""}","tecnologia":"${this.formExtraccion.controls['tecnologia'].value ? this.formExtraccion.controls['tecnologia'].value:""}","estado":"${this.formExtraccion.controls['estado'].value ? this.formExtraccion.controls['estado'].value:""}","hub":"${this.formExtraccion.controls['hub'].value ? this.formExtraccion.controls['hub'].value:""}","rama":"${this.formExtraccion.controls['rama'].value ? this.formExtraccion.controls['rama'].value:""}","nodo":"${this.formExtraccion.controls['nodo'].value ? this.formExtraccion.controls['nodo'].value:""}","fiberDeep":"${this.formExtraccion.controls['fiberDeep'].value ? this.formExtraccion.controls['fiberDeep'].value:""}","fechaInicio":"${this.formExtraccion.controls['fechaInicio'].value ? this.dateFormat(this.formExtraccion.controls['fechaInicio'].value):""}","nombreHub":"${this.formExtraccion.controls['nombreHub'].value ? this.formExtraccion.controls['nombreHub'].value:""}","Incidente":"${this.formExtraccion.controls['Incidente'].value ? this.formExtraccion.controls['Incidente'].value:""}","numOrden":"${this.formExtraccion.controls['numOrden'].value ? this.formExtraccion.controls['numOrden'].value:""}"}]`;
      // }
      // console.log(data)
      let regexCron=null;
      let horas =null;
      let minuto = null;
      let diasS=null;
      if(this.formExtraccion.controls['hora'].value && this.formExtraccion.controls['hora'].value.length>0 && this.formExtraccion.controls['hora'].value.length<=23){
        horas=this.formExtraccion.controls['hora'].value.join(',');
      }else if(this.formExtraccion.controls['hora'].value && this.formExtraccion.controls['hora'].value.length == 24){
        horas="*";
      }
      if(this.formExtraccion.controls['minuto'].value != null){
        minuto=this.formExtraccion.controls['minuto'].value;
      }
      if(this.formExtraccion.controls['diasSemana'].value && this.formExtraccion.controls['diasSemana'].value.length >0 && this.formExtraccion.controls['diasSemana'].value.length <=6){
        diasS = this.formExtraccion.controls['diasSemana'].value.join(',');
      }else if(this.formExtraccion.controls['diasSemana'].value && this.formExtraccion.controls['diasSemana'].value.length == 7){
        diasS ="*";
      }
  
      if(this.formExtraccion.controls['hora'].value==null || this.formExtraccion.controls['hora'].value.length ==0){
        regexCron = `0 0/${minuto} * ? * ${diasS}`;
        
      }else{
        
        regexCron = `0 ${minuto} ${horas?horas:"*"} ? * ${diasS}`;
      }
      data.scheduleExpression=regexCron;
      data.horaProgramacion = this.getTexto();
      
      data.procesando="0";
      data.status="Pendiente";
      const post = {
        data: data
      }


      this.cors.post('Reporte/GuardarFormularioEjecucionExtraccionAutomatizadosPrueba',data)
        .then((response) => {
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Exito!!!',
            detail: 'Datos guardados',
          });
          this.reset()
          setTimeout(() => {
            this.spinner = false;
            this.tablaExtraccion();
            this.reset()
            /* FLASK */
            this.http.post('https://izzicron.pagekite.me/programar', post).subscribe(
              (res: any) => {
                console.log(res)
              },
              (err: any) => {
                console.log(err)
              }
            );
            // this.http.post('http://192.168.51.199:2000/programar', post).subscribe(
            //   (res: any) => {
            //     console.log(res)
            //   },
            //   (err: any) => {
            //     console.log(err)
            //   }
            // );


            
          }, 3000);
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

      // this.cors.get(`Reporte/validarEjecucionExtraccionAutomatizacionHoraProgramada2Prueba`,{hora:moment(this.formExtraccion.controls['horaProgramacion'].value).format("HH")})
      // .then((response) => {


      //   // console.log(response)
      //   if(response[0] == 'SIN INFO'){
            

      //   }else{
      //     this.spinner=false;
      //     this.messageService.add({
      //       key:'tst',
      //       severity: 'error',
      //       summary: 'Ya existe este horario!!',
      //       detail: 'Intenta Nuevamente!!!',
      //     });
  
      //   }
      
   
      // })
      // .catch((error) => {
      //   console.log(error)
      //   this.messageService.add({
      //     key:'tst',
      //     severity: 'error',
      //     summary: 'No se logro editar!!',
      //     detail: 'Intenta Nuevamente!!!',
      //   });
      // });

      
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
    // this.formExtraccion.controls['numCaso'].reset();
    this.formExtraccion.controls['cuenta'].reset();
    this.formExtraccion.controls['categoria'].reset();
    this.formExtraccion.controls['motivo'].reset();
    this.formExtraccion.controls['subMotivo'].reset();
    this.formExtraccion.controls['solucion'].reset();
    this.formExtraccion.controls['areaConocimiento'].reset();
    this.formExtraccion.controls['fechaAsignacion'].reset();
    // this.formExtraccion.controls['rpt'].reset();
    this.formExtraccion.controls['tipoOrden'].reset();
    // this.formExtraccion.controls['asignada'].reset();
    this.formExtraccion.controls['horaProgramacion'].reset();

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
    this.formExtraccion.get('horaProgramacion')?.clearValidators();
    this.formExtraccion.get('horaProgramacion')?.updateValueAndValidity();


  };

  cambioTipoExtraccion(event:any){
    this.clearValidators();
    // console.log(event)
    // if(event ==="Cuenta"){
    //   this.formExtraccion.get('estado')?.setValidators([Validators.required]);
    //   this.formExtraccion.get('estado')?.updateValueAndValidity();
    //   this.formExtraccion.get('tipo')?.setValidators([Validators.required]);
    //   this.formExtraccion.get('tipo')?.updateValueAndValidity();
    //   this.formExtraccion.get('subtipo')?.setValidators([Validators.required]);
    //   this.formExtraccion.get('subtipo')?.updateValueAndValidity();
    //   this.formExtraccion.get('canalIngreso')?.setValidators([Validators.required]);
    //   this.formExtraccion.get('canalIngreso')?.updateValueAndValidity();
    // }else 
    if(event.value ==="Casos de negocio"){
      // this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      // this.formExtraccion.get('estado')?.updateValueAndValidity();
      // this.formExtraccion.get('numCaso')?.setValidators([Validators.required]);
      // this.formExtraccion.get('numCaso')?.updateValueAndValidity();
      // this.formExtraccion.get('cuenta')?.setValidators([Validators.required]);
      // this.formExtraccion.get('cuenta')?.updateValueAndValidity();
      // this.formExtraccion.get('categoria')?.setValidators([Validators.required]);
      // this.formExtraccion.get('categoria')?.updateValueAndValidity();
      // this.formExtraccion.get('motivo')?.setValidators([Validators.required]);
      // this.formExtraccion.get('motivo')?.updateValueAndValidity();
      // this.formExtraccion.get('subMotivo')?.setValidators([Validators.required]);
      // this.formExtraccion.get('subMotivo')?.updateValueAndValidity();
      // this.formExtraccion.get('solucion')?.setValidators([Validators.required]);
      // this.formExtraccion.get('solucion')?.updateValueAndValidity();
      // this.formExtraccion.get('horaProgramacion')?.setValidators([Validators.required]);
      // this.formExtraccion.get('horaProgramacion')?.updateValueAndValidity();


    }else if(event.value ==="Actividades"){
      // this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      // this.formExtraccion.get('estado')?.updateValueAndValidity();
      // this.formExtraccion.get('areaConocimiento')?.setValidators([Validators.required]);
      // this.formExtraccion.get('areaConocimiento')?.updateValueAndValidity();
      // this.formExtraccion.get('fechaAsignacion')?.setValidators([Validators.required]);
      // this.formExtraccion.get('fechaAsignacion')?.updateValueAndValidity();
      // this.formExtraccion.get('horaProgramacion')?.setValidators([Validators.required]);
      // this.formExtraccion.get('horaProgramacion')?.updateValueAndValidity();


    }else if(event.value ==="Ordenes de servicio"){
      // this.formExtraccion.get('motivo')?.setValidators([Validators.required]);
      // this.formExtraccion.get('motivo')?.updateValueAndValidity();
      // this.formExtraccion.get('rpt')?.setValidators([Validators.required]);
      // this.formExtraccion.get('rpt')?.updateValueAndValidity();
      // this.formExtraccion.get('tipoOrden')?.setValidators([Validators.required]);
      // this.formExtraccion.get('tipoOrden')?.updateValueAndValidity();
      // this.formExtraccion.get('asignada')?.setValidators([Validators.required]);
      // this.formExtraccion.get('asignada')?.updateValueAndValidity();
      // this.formExtraccion.get('estado')?.setValidators([Validators.required]);
      // this.formExtraccion.get('estado')?.updateValueAndValidity();
      // this.formExtraccion.get('horaProgramacion')?.setValidators([Validators.required]);
      // this.formExtraccion.get('horaProgramacion')?.updateValueAndValidity();


    }
  }
  dateFormat(value:any){
    // console.log(value)
    if(value != null){
      return moment(value).format('DD/MM/yyyy HH:mm:ss')
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
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  capitalizarFirstLeter(item:any){
    return item.slice(0, 1).toUpperCase() + item.slice(1);
  }

  tablaExtraccion(){
    this.cors.get('Reporte/getmostrarTablaExtraccionAutomatizadosPrueba',{})
    .then((response) => {
      // console.log(response)
      if(response[0] == "SIN INFO"){
        // this.messageService.add({
        //   key:'tst',
        //   severity: 'error',
        //   summary: 'No hay datos !!',
        //   detail: 'Intenta Nuevamente!!!',
        // });
      }else{
        for(let i = 0 ; i<response.length;i++){
          if(response[i].procesando && response[i].procesando=="1"){
            response[i].procesando="Si"
          }else{
            response[i].procesando="No"
          }
          if(response[i].parametrosExtraccion){
            let modifiedString;
            if(response[i].tipoExtraccion == "Casos de negocio"){
              modifiedString = response[i].parametrosExtraccion
              .replace(/"estado":"(.*?)",/g, (match:any, p1:any) => {
                // const modifiedestado = p1.replace(/"/g, '\\"'); //pone \ a los "" que sobran
                const modifiedestado = p1.replace(/"/g, "'");
                return `"estado":"${modifiedestado}",`;
              }).replace(/"cuenta":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedcuenta = p1.replace(/"/g, "'");
                return `"cuenta":"${modifiedcuenta}",`;
              }).replace(/"medioContacto":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedmedioContacto = p1.replace(/"/g, "'");
                return `"medioContacto":"${modifiedmedioContacto}",`;
              }).replace(/"casoNegocio":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedcasoNegocio = p1.replace(/"/g, "'");
                return `"casoNegocio":"${modifiedcasoNegocio}",`;
              }).replace(/"categoria":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedcategoria = p1.replace(/"/g, "'");
                return `"categoria":"${modifiedcategoria}",`;
              }).replace(/"motivo":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedmotivo = p1.replace(/"/g, "'");
                return `"motivo":"${modifiedmotivo}",`; 
              }).replace(/"subMotivo":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedSubMotivo = p1.replace(/"/g, "'");
                return `"subMotivo":"${modifiedSubMotivo}",`;
              }).replace(/"solucion":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedSolucion = p1.replace(/"/g, "'");
                return `"solucion":"${modifiedSolucion}",`;
              }).replace(/"motivoCliente":"(.*?)(?=}])/g, (match:any, p1:any) => {
                const modifiedmotivoCliente = p1.replace(/"/g, "'");
                // console.log(match)
                // console.log(p1)
                return `"motivoCliente":"${modifiedmotivoCliente}"`;
              });
            }else if(response[i].tipoExtraccion == "Actividades"){
              modifiedString = response[i].parametrosExtraccion
              .replace(/"estado":"(.*?)",/g, (match:any, p1:any) => {
                // const modifiedestado = p1.replace(/"/g, '\\"'); //pone \ a los "" que sobran
                const modifiedestado = p1.replace(/"/g, "'");
                return `"estado":"${modifiedestado}",`;
              }).replace(/"areaConocimiento":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedareaConocimiento = p1.replace(/"/g, "'");
                return `"areaConocimiento":"${modifiedareaConocimiento}",`;
              }).replace(/"tipo":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedtipo = p1.replace(/"/g, "'");
                return `"tipo":"${modifiedtipo}",`;
              });
            }else if(response[i].tipoExtraccion == "Ordenes de servicio"){
              modifiedString = response[i].parametrosExtraccion
              .replace(/"cuenta":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedcuenta = p1.replace(/"/g, "'");
                return `"cuenta":"${modifiedcuenta}",`;
              }).replace(/"compania":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedcompania = p1.replace(/"/g, "'");
                return `"compania":"${modifiedcompania}",`;
              }).replace(/"telefonos":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedtelefonos = p1.replace(/"/g, "'");
                return `"telefonos":"${modifiedtelefonos}",`;
              }).replace(/"numOrden":"(.*?)",/g, (match:any, p1:any) => {
                const modifiednumOrden = p1.replace(/"/g, "'");
                return `"numOrden":"${modifiednumOrden}",`;
              }).replace(/"tipoOrden":"(.*?)",/g, (match:any, p1:any) => {
                const modifiedtipoOrden = p1.replace(/"/g, "'");
                return `"tipoOrden":"${modifiedtipoOrden}",`; 
              }).replace(/"estado":"(.*?)(?=}])/g, (match:any, p1:any) => {
                const modifiedestado = p1.replace(/"/g, "'");
                return `"estado":"${modifiedestado}"`;
              });
            }
            // console.log(modifiedString)    
            let jsonArray = JSON.parse(modifiedString);
            // console.log(jsonArray)
            response[i].parametrosExtraccion = jsonArray;

          }
        }
        
        this.datosExtraccion = response;
        

      }
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

  tablaExtraccion2(){
    this.cors.get('Reporte/getmostrarTablaExtraccionAutomatizados2Prueba',{})
    .then((response) => {
      // console.log(response)
      if(response[0] == "SIN INFO"){
        // this.messageService.add({
        //   key:'tst',
        //   severity: 'error',
        //   summary: 'No hay datos !!',
        //   detail: 'Intenta Nuevamente!!!',
        // });
      }else{
        // for(let i = 0 ; i<response.length;i++){
        //   if(response[i].procesando && response[i].procesando=="1"){
        //     response[i].procesando="Si"
        //   }else{
        //     response[i].procesando="No"
        //   }
        //   const jsonArray = JSON.parse(response[i].parametrosExtraccion);
        //   response[i].parametrosExtraccion = jsonArray;
        // }
        
        this.datosExtraccion2 = response;

      }
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
    this.archivoSeleccionado = archivo;
		this.loading2 = true;

    this.cors.get1(`Reporte/BajarExtraccionExcelFTP`,{
      "nombre":archivo
    })
    .then((response) => {
      // console.log(response)
      this.show = true;
      this.url1 = `https://rpabackizzi.azurewebsites.net/Reporte/BajarExtraccionExcelFTP?nombre=${archivo}`;

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
  
      
    })
    .catch((error) => {
      console.log(error)
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'No se logro descargar',
        detail: 'Intenta Nuevamente!!!',
      });
      this.loading2 = false;
      this.archivoSeleccionado = '';

    });
    this.show=false;

  }

  estaSiendoDescargado(archivo: string): boolean {
		return this.archivoSeleccionado === archivo && this.loading2;
	}

  eliminar(item:any){
    // console.log(item);



    this.cors.delete(`Reporte/EliminarEjecucionExtraccionAutomatizadosPrueba?id=${item.id}`,
      {
        "id": item.id,
        "tipoExtraccion": "string",
        "fechaExtraccion": "2023-08-03T23:49:10.217Z",
        "parametrosExtraccion": "string",
        "archivo": "string",
        "cve_usuario": "string",
        "fechaCompletado": "2023-08-03T23:49:10.217Z",
        "status": "string",
        "procesando": "string",
        "ip": "string",
        "horaProgramacion": "string"
      }
      )
    .then((response) => {
      let index = this.datosExtraccion.indexOf(item);
      if(index !== -1){
        this.datosExtraccion = this.datosExtraccion.slice(0, index).concat(this.datosExtraccion.slice(index + 1));
      }
      
      this.datosExtraccion.slice(1,response);
      
      this.tablaExtraccion()
      this.messageService.add({
        key:'tst',
        severity: 'success',
        summary: 'Se elimino el registro!!',
        detail: 'Con exito!!',
      });  
        /* FLASK */
        this.http.post('https://izzicron.pagekite.me/eliminar', {data: item}).subscribe(
          (res: any) => {
            console.log(res);
          },
          (err: any) => {
            console.log(err);
          }
        )

        // this.http.post('http://192.168.51.199:2000/eliminar', {data: item}).subscribe(
        //   (res: any) => {
        //     console.log(res);
        //   },
        //   (err: any) => {
        //     console.log(err);
        //   }
        // )

    })
    .catch((error) => {
      console.log(error)
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'No se logro eliminar!!',
        detail: 'Intenta Nuevamente!!!',
      });
    });

  }

  editar(item:any){ 
    // console.log("editar",item)
    this.modal=true;
    this.nuevaHora = item.horaProgramacion.substring(0,5);
    this.id=item.id;
    // console.log(this.nuevaHora)
    // console.log(this.id)
  }

  editar1(){
    let viejo = this.nuevaHora;
    let nuevaH = moment(this.nuevaHora).format("HH:mm:00")
    let nuevaV = moment(this.nuevaHora).format("HH:mm")
    let a= null;
    // console.log("Viejo",viejo)
    // console.log("nuevo",nuevaV)
    if(nuevaV=='Fecha inválida'){
      let b = viejo.split(":");
      a=b[0];
    }else if(nuevaV!='Fecha inválida'){
      let b= nuevaV.split(":");
      a=b[0]
    }
    // console.log(a)
    this.cors.get(`Reporte/validarEjecucionExtraccionAutomatizacionHoraProgramadaPrueba`,{hora:a,id:this.id})
    .then((response) => {
      // console.log(response)
      let z=null;
      if(nuevaH == 'Fecha inválida'){
        z=viejo+":00"
      }else{
        z=nuevaH
      }
      if(response[0]=='SIN INFO'){
        this.cors.put(`Reporte/ActualizaEjecucionExtraccionAutomatizadosHoraProgramadaPrueba?id=${this.id}`,
          {
            "id": this.id,
            "tipoExtraccion": "string",
            "fechaExtraccion": "2023-08-04T18:35:02.042Z",
            "parametrosExtraccion": "string",
            "archivo": "string",
            "cve_usuario": "string",
            "fechaCompletado": "2023-08-04T18:35:02.042Z",
            "status": "string",
            "procesando": "string",
            "ip": "string",
            "horaProgramacion": z
          }
        )
          .then((response) => {
            // console.log(response)
            this.messageService.add({
              key:'tst',
              severity: 'success',
              summary: 'Se logro editar!!',
              detail: 'Con Exito!!',
            });
          })
          .catch((error) => {
            console.log(error)
            this.messageService.add({
              key:'tst',
              severity: 'error',
              summary: 'No se logro editar!!',
              detail: 'Intenta Nuevamente!!!',
            });
          });



      }else if(response[0].id){
        this.messageService.add({
          key:'tst',
          severity: 'error',
          summary: 'Ya existe este horario',
          detail: 'Intenta Nuevamente!!',
        });      
        
      }
      this.modal=false;
      this.tablaExtraccion()
    })
    .catch((error) => {
      console.log(error)
      this.messageService.add({
        key:'tst',
        severity: 'error',
        summary: 'No se logro editar!!',
        detail: 'Intenta Nuevamente!!!',
      });
    });


  }
  

  getDiaLabel(selectedValue: number): string {
    const selectedDay = this.diasemanas.find((dia) => dia.value === selectedValue);
    return selectedDay ? selectedDay.label : '';
  }
  getHoraLabel(selectedValue: string): string {
    const selectedHora = this.horas.find((hora) => hora.value === selectedValue);
    return selectedHora ? selectedHora.label : '';
  }

  getMinutoLabel(selectedValue: string): string {
    const selectedHora = this.min.find((hora) => hora.value === selectedValue);
    return selectedHora ? selectedHora.label : '';
  }

  cambioHora(event:any){
    // console.log(event)
    let a="";
    if(event.length==0){
      this.h="";
    }else if(event.length==1){
      if(event[0] == 0){
        a+=`24am`
      }else if(event[0] >=1 && event[0] <=11){
        a+=`${event[0]}am`;
      }else if(event[0] >=12 && event[0] <=23){
        a+=`${event[0]}pm`;
      }
      this.h=a;
    }else if(event.length >1){
      for(let i = 0 ; i< event.length;i++){
        // console.log(this.getHoraLabel(event[i]))
        if(event[i] == 0){
          a+=`24am, `
        }else if(event[i] >=1 && event[i] <=11){
          a+=`${event[i]}am, `;
        }else if(event[i] >=12 && event[i] <=23){
          a+=`${event[i]}pm, `;
        }
        
      }
      let b = a.substring(0, a.length - 2);
      // console.log(b)
      this.h=b;
      
    }
  }

  cambioDias(event:any){
    // console.log(event)
    let a ="";
    if(event.length==0){
      a="";
    }else if(event.length==1){
        a = `${this.getDiaLabel(event[0])}`;
    }else if(event.length>1){
      
      for(let i =0;i<event.length;i++){
        if(i==event.length-1){
          a+=`${this.getDiaLabel(event[i])}`;
        }else{
          a+=`${this.getDiaLabel(event[i])}, `;

        }
      }
    }
    this.d=a;
  }

  cambioMin(event:any){
    if(event <9){
      this.m=`0${event}`;
    }else{
      this.m=event;

    }
  }

  getTexto(): string {
    if(this.formExtraccion.controls['hora'].value && this.formExtraccion.controls['hora'].value.length>0 && (this.formExtraccion.controls['minuto'].value || this.formExtraccion.controls['minuto'].value==0)){
      let a="";
        for(let i = 0 ; i< this.formExtraccion.controls['hora'].value.length;i++){
          // console.log(this.getHoraLabel(event[i]))
          if(this.formExtraccion.controls['hora'].value[i] == 0){
            a+=`24:${this.m}am, `
          }else if(this.formExtraccion.controls['hora'].value[i] >=1 && this.formExtraccion.controls['hora'].value[i] <=11){
            if(this.formExtraccion.controls['hora'].value[i] >=1 && this.formExtraccion.controls['hora'].value[i] <10){
              a+=`0${this.formExtraccion.controls['hora'].value[i]}:${this.m}am, `;

            }else{
              a+=`${this.formExtraccion.controls['hora'].value[i]}:${this.m}am, `;
            }
          }else if(this.formExtraccion.controls['hora'].value[i] >=12 && this.formExtraccion.controls['hora'].value[i] <=23){
            a+=`${this.formExtraccion.controls['hora'].value[i]}:${this.m}pm, `;
          }
          
        }
        this.h=a.substring(0,a.length-2);
      return `Se ejecuta a las <strong>${this.h}</strong> los días: <strong>${this.d}</strong>`;
      
    }
    if( this.formExtraccion.controls['minuto'].value){
      return `Se ejecuta cada <strong>${this.m}</strong> minutos los días: <strong>${this.d}</strong>`;

    }else if( this.formExtraccion.controls['minuto'].value ==0){
      return `Se ejecuta cada minuto los días: <strong>${this.d}</strong>`;

    }
      return "";
  
  }

  prueba(){
    console.log("prueba")
    this.cors.getCommand(`http://192.168.49.87:2000`).then((response) => {
      console.log(response)

    })
  }


}
