import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios-dashboard/usuarios.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    NuevoUsuarioComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ], providers: [
    ConfirmationService, MessageService
  ]
})
export class UsuariosModule { }
