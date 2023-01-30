import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepuracionRoutingModule } from './depuracion-routing.module';
import { DashboardDepuracionComponent } from './dashboard-depuracion/dashboard-depuracion.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    DashboardDepuracionComponent
  ],
  imports: [
    CommonModule,
    DepuracionRoutingModule,
	SharedModule
  ]
})
export class DepuracionModule { }
