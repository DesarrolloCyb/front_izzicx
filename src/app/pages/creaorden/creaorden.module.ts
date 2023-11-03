import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreaordenRoutingModule } from './creaorden-routing.module';
import { CreacionOrdenesComponent } from './creacion-ordenes/creacion-ordenes.component';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';


@NgModule({
  declarations: [
    CreacionOrdenesComponent,
    PantallaConsultaComponent
  ],
  imports: [
    CommonModule,
    CreaordenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class CreaordenModule { }
