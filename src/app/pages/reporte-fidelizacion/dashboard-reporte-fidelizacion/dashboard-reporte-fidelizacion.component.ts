import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment.lang('es');


@Component({
  selector: 'dashboard-reporte-fidelizacion',
  templateUrl: './dashboard-reporte-fidelizacion.component.html',
  styleUrls: ['./dashboard-reporte-fidelizacion.component.scss']
})
export class DashboardReporteFidelizacionComponent implements OnInit {

  formReporte:UntypedFormGroup;
  today = new Date();

  constructor(private formBuilder: UntypedFormBuilder) { 
    this.formReporte = this.formBuilder.group({
      reporte: [null, Validators.required],
      fechaini: [null, Validators.required],
      fechafin: [null, Validators.required],
    });

  }

  ngOnInit(): void {
  }

  dateFormat(value:any){
    return moment(value).format('yyyy-MM-DD hh:mm:ss')
  }

  cambioReporte(event:any){
    console.log(event)
  }

}
