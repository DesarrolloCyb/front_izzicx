import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteFidelizacionRoutingModule } from './reporte-fidelizacion-routing.module';
import { DashboardReporteFidelizacionComponent } from './dashboard-reporte-fidelizacion/dashboard-reporte-fidelizacion.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardReporteFidelizacionComponent
  ],
  imports: [
    CommonModule,
    ReporteFidelizacionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class ReporteFidelizacionModule { }
