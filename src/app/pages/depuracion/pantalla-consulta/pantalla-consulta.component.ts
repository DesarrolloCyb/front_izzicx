import { Component, OnInit } from '@angular/core';
import { Message,MessageService } from 'primeng/api';
import { CorsService } from '@services';
import * as moment from 'moment';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'pantalla-consulta',
  templateUrl: './pantalla-consulta.component.html',
  styleUrls: ['./pantalla-consulta.component.scss']
})
export class PantallaConsultaComponent implements OnInit {
  stats:any;
  formBusqueda:UntypedFormGroup;
  msgs: Message[] = [];
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}");
  consulta:any;

  constructor(
    private cors: CorsService,
    private messageService: MessageService,
    private formBuilder: UntypedFormBuilder,

  ) { 
    this.formBusqueda = this.formBuilder.group({
      cuenta: [null,Validators.required],
      cve_usuario: [this.usuario.email, Validators.required], //Se obtiene del direcotrio activo
    });

  }

  ngOnInit(): void {
    this.statsBasesDepuradas()
  }

  buscar(){
    let orden = {
      "orden":`${this.formBusqueda.controls['cuenta'].value}`
    }
    this.cors.get('EjecucionDepuracion/getConsultaBasesCanceladasOSEXT',orden).then((response) => {
      if(response.length == 0){
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Atención',
          detail: 'No hay Registros',
        });
      }else{
        let info = response[0];
        info.usuario=info.cve_Usuario;
        delete info.cve_Usuario;
        info.compañia=info.compania;
        delete info.compania;
        info['Fecha de Carga']=this.dateFormat(info.fechaCarga);
        delete info.fechaCarga;
        info['Motivo de la Orden']=info.motivoOrden;
        delete info.motivoOrden;
        info['Número de la Orden']=info.numOrden;
        delete info.numOrden;
        delete info.usuario;
        info['procesando']= info['procesando']=="1"?"Si":"No";
        delete info.numOrden;
        console.log(info)
        let objetoLimpio = Object.entries(info)
        .filter(([key, value]) => value !== null && value !== "" && !this.isObjectEmpty(value))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        console.log(objetoLimpio)
        this.consulta=objetoLimpio;
        // this.consulta=response;
        
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  isObjectEmpty(obj:any): boolean {
    return Object.keys(obj).length === 0;
  }

  primeraLetraMayuscula(item:any){
    if(item){
      return item.charAt(0).toUpperCase()+item.slice(1);
    }else{
      return "";
    }
  }

  dateFormat(value:any){
    // console.log(value)
    if(value != null || value != undefined){
      return moment(value).format('DD/MM/yyyy hh:mm:ss a')
    }else{
      return ""
    }
  }
  

  statsBasesDepuradas(){
    this.cors.get('EjecucionDepuracion/statsBasesCanceladas').then((response) => {
      console.log(response)
      for (let i = 0; i < response.length; i++) {
        const jsonObject = response[i];
        for (let key in jsonObject) {
          if (jsonObject.hasOwnProperty(key) && typeof jsonObject[key] === "object" && !Array.isArray(jsonObject[key])) {
            jsonObject[key] = 0;
          }
        }
      }      
      this.stats=response;
    }).catch((error) => {
      console.log(error)
    })
  }
}
