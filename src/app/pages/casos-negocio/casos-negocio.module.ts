import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasosNegocioRoutingModule } from './casos-negocio-routing.module';
import { DashboardCasosNegocioComponent } from './dashboard-casos-negocio/dashboard-casos-negocio.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';
import { ParametrosconfigComponent } from './parametrosconfig/parametrosconfig.component';


@NgModule({
  declarations: [
    DashboardCasosNegocioComponent,
    PantallaConsultaComponent,
    ParametrosconfigComponent
  ],
  imports: [
    CommonModule,
    CasosNegocioRoutingModule,
	SharedModule
  ]
})
export class CasosNegocioModule { }
