import { Component, OnInit } from '@angular/core';
import { Message,MessageService } from 'primeng/api';
import { CorsService } from '@services';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { Table } from 'primeng/table';


@Component({
  selector: 'pantalla-consulta',
  templateUrl: './pantalla-consulta.component.html',
  styleUrls: ['./pantalla-consulta.component.scss']
})
export class PantallaConsultaComponent implements OnInit {
  notdone:any[]=[];
  stats:any[]=[];
  ajustes:any[]=[];
  visible:boolean=false;
  itemSeleccionado: any = {
    tiempoAjuste:"",
    valor:""
  };

  constructor(
    private cors: CorsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getTablaNotDone();
    this.statsNotDone();
    this.getTableAjustesNotDone();
  }

  getTablaNotDone(){
    this.cors.get('AjustesNotDone/getAllEjecucionNotDone').then((response) => {
      // console.log(response)
      if(response[0] == 'SIN INFO'){
        this.notdone=[];
      }else{
        this.notdone=response;
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  dateFormat(value:any){
    // console.log(value)
    if(value != null){
      return moment(value).format('DD/MM/yyyy HH:mm:ss')
    }else{
      return ""
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  statsNotDone(){
    this.cors.get('AjustesNotDone/getStatsNotDone').then((response) => {
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

  getTableAjustesNotDone(){
    this.cors.get('AjustesNotDone/getAjustesNotDone').then((response) => {
      if(response[0]=='SIN INFO'){
        this.ajustes=[];
      }else{
        this.ajustes=response;
      }
    }).catch((error) => {
      console.log(error)
    })

  }

  abrirDialogo(item: any) {
    this.itemSeleccionado = item;
    this.visible = true;
  }

  save(){
    const regex=/^[0-9]+$/;
    if(regex.test(this.itemSeleccionado.numero)){
      this.cors.put(`AjustesNotDone/ActualizaAjustesNotDone?id=${this.itemSeleccionado.id}`,this.itemSeleccionado).then((response) => {
        this.visible=false;
        this.getTableAjustesNotDone();
      }).catch((error) => {
        console.log(error)
      })
  
    }else{
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Solo se permiten Números',
        detail: 'Intentalo nuevamentes',
      });

    }
  }



}
