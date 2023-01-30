import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasosNegocioRoutingModule } from './casos-negocio-routing.module';
import { DashboardCasosNegocioComponent } from './dashboard-casos-negocio/dashboard-casos-negocio.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';


@NgModule({
  declarations: [
    DashboardCasosNegocioComponent
  ],
  imports: [
    CommonModule,
    CasosNegocioRoutingModule,
	SharedModule
  ]
})
export class CasosNegocioModule { }
