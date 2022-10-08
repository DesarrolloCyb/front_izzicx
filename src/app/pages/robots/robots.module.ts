import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RobotsRoutingModule } from './robots-routing.module';
import { RobotsComponent } from './robots-dasboard/robots.component';
import { SocketIoService } from 'app/_services/socketio.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'environments/environment';
import { RobotsNuevoComponent } from './robots-nuevo/robots-nuevo.component';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const config: SocketIoConfig = { url: environment.SCOCKET_URL };


@NgModule({
  declarations: [
    RobotsComponent,
    RobotsNuevoComponent
  ],
  imports: [
    SharedModule,

    CommonModule,
    RobotsRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
  ], providers: [
    SocketIoService
  ]
})
export class RobotsModule { }
