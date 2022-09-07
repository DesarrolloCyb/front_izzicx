import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ReportesComponent implements OnInit {
  //OPCIONES SELECCIONADAS EN EL FORMAULARIO
  rangeDates: any;
  //Opciones del dropown
  reportes:any = [];
  //Reporte seleecionado
  selectedDrop: any = { value: '' };
  mostrandoResultados: boolean = false
  //Barra de carga
  value = 0;
  interval:any;

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
    ) {

    this.reportes = [
      { label: 'Single Video',   value:'single_video'},
      { label: 'Modem en Combo', value:'modem_combo'},
      { label: 'BTCEL en combo', value:'btcel_combo'},
      ];
  }

  ngOnInit(): void {
    this.progressBar()
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
        key: 'confirm2',
        target: event.target || new EventTarget,
        message: '¿Los datos son correctos?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Generando', detail: 'Se ha generado el reporte del metodo []' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'Reporte Cancelado' });
        }
    });
}

progressBar(){
  this.interval = setInterval(() => {
    this.value = this.value + Math.floor(Math.random() * 10) + 1;
    if (this.value >= 100) {
        this.value = 100;
        clearInterval(this.interval);
    }
}, 2000);
}



}
