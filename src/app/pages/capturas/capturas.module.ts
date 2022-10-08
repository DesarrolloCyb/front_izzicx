import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { CommonModule } from '@angular/common';
import { CancelacionComponent } from './cancelacion/cancelacion.component';
import { CapturasRoutingModule } from './capturas-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SolicitudCancelacionComponent } from './solicitud-cancelacion/solicitud-cancelacion/solicitud-cancelacion.component'



@NgModule({
  declarations: [CancelacionComponent, SolicitudCancelacionComponent],
  imports: [
    SharedModule,
    CommonModule,
    CapturasRoutingModule,
   
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[]
})
export class CapturasModule {}
