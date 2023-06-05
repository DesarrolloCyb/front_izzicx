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
  tabla:any[]=[];
  stats:any[]=[];
  loading:boolean=false;
  constructor(
    private cors: CorsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTableAjustesyCambioServicio();
    this.getStatsAjustesyCambioServicio();
  }

  getTableAjustesyCambioServicio(){
    this.loading= true;
    this.cors.get('AjustesCambiosServicios/getAjustesCambioServicioInfo')
    .then((response)=>{
      // console.log(response)
      if(response[0]=='SIN INFO'){
        this.tabla=[];

      }else{
        for (let i = 0; i < response.length; i++) {
          const jsonObject = response[i];
          for (let key in jsonObject) {
            if (jsonObject.hasOwnProperty(key) && typeof jsonObject[key] === "object" && !Array.isArray(jsonObject[key])) {
              jsonObject[key] = 0;
            }
          }
        }      
  
        this.tabla=response;
      }
    })
    .catch((err)=>{
      console.log(err)
    });
    this.loading= false;
  }

  getStatsAjustesyCambioServicio(){
    this.cors.get('AjustesCambiosServicios/getStatsAjustesCambioServicio')
    .then((response)=>{
      console.log(response)
      if(response[0]=='SIN INFO'){
        this.stats=[];

      }else{
        this.stats=response;
      }
    })
    .catch((err)=>{
      console.log(err)
    });
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

}
