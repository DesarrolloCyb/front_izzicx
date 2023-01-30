import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraccionRoutingModule } from './extraccion-routing.module';
import { DashboardExtraccionComponent } from './dashboard-extraccion/dashboard-extraccion.component';

import { SharedModule } from 'app/_shared/modules/shared/shared.module';

@NgModule({
  declarations: [
    DashboardExtraccionComponent
  ],
  imports: [
    CommonModule,
    ExtraccionRoutingModule,
	SharedModule
  ]
})
export class ExtraccionModule { }
