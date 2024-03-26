import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimpiezaRoutingModule } from './limpieza-routing.module';
import { RecuperadoresComponent } from './recuperadores/recuperadores.component';
import { SeriesComponent } from './series/series.component';
import { SafeUrlPipe } from './safeUrl.pipe';
import { SharedModule } from '@shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    RecuperadoresComponent,
    SafeUrlPipe,
    SeriesComponent
  ],
  imports: [
    CommonModule,
    LimpiezaRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ConfirmationService,MessageService,
  ]
})
export class LimpiezaModule { }
