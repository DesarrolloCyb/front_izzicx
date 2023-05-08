import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesYcambioServiciosRoutingModule } from './ajustes-ycambio-servicios-routing.module';
import { BaseDatosAjustesComponent } from './base-datos-ajustes/base-datos-ajustes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ReporteComponent } from './reporte/reporte.component';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BaseDatosAjustesComponent,
    EstadisticasComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    AjustesYcambioServiciosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AjustesYcambioServiciosModule { }
