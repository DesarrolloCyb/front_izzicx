import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraccionRoutingModule } from './extraccion-routing.module';
import { DashboardExtraccionComponent } from './dashboard-extraccion/dashboard-extraccion.component';

import { SharedModule } from 'app/_shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisualizacionComponent } from './visualizacion/visualizacion.component';

@NgModule({
  declarations: [
    DashboardExtraccionComponent,
    VisualizacionComponent
  ],
  imports: [
    CommonModule,
    ExtraccionRoutingModule,
	  SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExtraccionModule { }
