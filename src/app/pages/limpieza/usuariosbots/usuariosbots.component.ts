import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CorsService } from '@services';
import { ConfirmationService,Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'usuariosbots',
  templateUrl: './usuariosbots.component.html',
  styleUrls: ['./usuariosbots.component.scss']
})
export class UsuariosbotsComponent implements OnInit {

  button:boolean=true;
  spinner:boolean=false;
  closeModal: boolean = true;
  display: boolean = false;
  enviando: boolean = false;
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
  toClearControls: string[] = ["falla"]
  msgs: Message[] = [];
  validador = [false];
  TablaUsrbots:any=[];
  loading: boolean = false
  ExcelData:any=[];
  tabla:boolean=false;
  headers:string[]=[
    'serie',
  ];


  constructor(
    private cors: CorsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public router: Router
  ) {

   }

  ngOnInit(): void {
    this.getTablaUsrbots();
  }

  showErrorViaToast() {
    console.log('ERROR');
    this.messageService.add({
      key: 'tst',
      severity: 'error',
      summary: 'Faltan datos',
      detail: 'Ingrese todos todos los campos',
    });
  }
  load(index: number) {
    this.validador[index] = true;
    setTimeout(() => (this.validador[index] = false), 1000);
  }
  
  getTablaUsrbots(){
    this.cors.get('Bots/getUsrbots')
    .then((response)=>{
      console.log(response)
      this.TablaUsrbots = response;
    })
    .catch((err)=>{
      console.log(err)
    });
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  showToastSuccess(message: string) {
    this.messageService.add({
        key: 'tst',
        severity: 'success',
        summary: 'Éxito',
        detail: message
    });
}

showToastError(message: string) {
    this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: message
    });
}


eliminarusrbot(id: any){
  const item = this.TablaUsrbots.find((item: any) => item.id === id);
  const usrinfo = item ? item.procesoUser : 'desconocido';
  
  this.confirmationService.confirm({
    key: 'deleteColumn',
    message: `¿Estás seguro de que quieres eliminar el usuario <strong>${usrinfo}</strong>?`,
    accept: () => {
      this.cors.delete(`Bots/EliminarFilaserie?id=${id}`, 
        {
          "id": id
        }
      ).then((response) => {
        console.log(response);
        const index = this.TablaUsrbots.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          this.TablaUsrbots.splice(index, 1);
        }
        this.showToastSuccess(`Se eliminó el usuario con información ${usrinfo} correctamente.`)
      }).catch((error) => {
        console.log(error);
        this.showToastError(`No se logró eliminar la fila con información ${usrinfo}`)
      })
    }
  });
}

}
