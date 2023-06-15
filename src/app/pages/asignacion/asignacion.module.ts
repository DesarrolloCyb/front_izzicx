import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionRoutingModule } from './asignacion-routing.module';
import { DashboardAsignacionComponent } from './dashboard-asignacion/dashboard-asignacion.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';
import { ParametrosconfigComponent } from './parametrosconfig/parametrosconfig.component';
import { SubirbaseSinValidacionComponent } from './subirbase-sin-validacion/subirbase-sin-validacion.component';
import { ConsultaSinValidacionComponent } from './consulta-sin-validacion/consulta-sin-validacion.component';


@NgModule({
  declarations: [
    DashboardAsignacionComponent,
    PantallaConsultaComponent,
    ParametrosconfigComponent,
    SubirbaseSinValidacionComponent,
    ConsultaSinValidacionComponent
  ],
  imports: [
    CommonModule,
    AsignacionRoutingModule,
	SharedModule
  ]
})
export class AsignacionModule { }
