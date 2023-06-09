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
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
  msgs: Message[] = [];
  showtable:any;
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
    this.getTableCasosNegocioCobranza();
    this.statsAjustesCasoNeogicoCobranza();
    this.getTableAjustesCobranzaTiempo();
  }

  getTableCasosNegocioCobranza(){
    this.cors.get('AjustesNotDone/getAllAjustesCasosNegocioCobranza').then((response) => {
      // console.log(response)
      if(response[0] =='SIN INFO'){
        this.showtable = [];

      }else{
        this.showtable = response;

      }
    }).catch((error) => {
      console.log(error)
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  dateFormat(value:any){
    // console.log(value)
    if(value != null){
      return moment(value).format('DD/MM/yyyy HH:mm:ss')
    }else{
      return ""
    }
  }

  statsAjustesCasoNeogicoCobranza(){
    this.cors.get('AjustesNotDone/getStatsAjustesCasoNegocioCobranza').then((response) => {
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

  getTableAjustesCobranzaTiempo(){
    this.cors.get('AjustesNotDone/getAjustesTiempoAjuste').then((response) => {
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
    if(regex.test(this.itemSeleccionado.valor)){
      this.cors.put(`AjustesNotDone/ActualizaAjustesTiempoAjuste?id=${this.itemSeleccionado.id}`,this.itemSeleccionado).then((response) => {
        this.visible=false;
        this.getTableAjustesCobranzaTiempo()
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
