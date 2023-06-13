import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionRoutingModule } from './asignacion-routing.module';
import { DashboardAsignacionComponent } from './dashboard-asignacion/dashboard-asignacion.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';
import { ParametrosconfigComponent } from './parametrosconfig/parametrosconfig.component';


@NgModule({
  declarations: [
    DashboardAsignacionComponent,
    PantallaConsultaComponent,
    ParametrosconfigComponent
  ],
  imports: [
    CommonModule,
    AsignacionRoutingModule,
	SharedModule
  ]
})
export class AsignacionModule { }
