import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepuracionRoutingModule } from './depuracion-routing.module';
import { DashboardDepuracionComponent } from './dashboard-depuracion/dashboard-depuracion.component';
import { SharedModule } from 'app/_shared/modules/shared/shared.module';
import { BasesDepuradasComponent } from './bases-depuradas/bases-depuradas.component';
import { SafeUrlPipe } from './safeUrl.pipe';


@NgModule({
  declarations: [
    DashboardDepuracionComponent,
    BasesDepuradasComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    DepuracionRoutingModule,
	SharedModule
  ]
})
export class DepuracionModule { }
