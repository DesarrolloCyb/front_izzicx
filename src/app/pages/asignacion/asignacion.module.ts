import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsignacionRoutingModule } from './asignacion-routing.module';
import { DashboardAsignacionComponent } from './dashboard-asignacion/dashboard-asignacion.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    DashboardAsignacionComponent
  ],
  imports: [
    CommonModule,
    AsignacionRoutingModule,
	SharedModule
  ]
})
export class AsignacionModule { }
