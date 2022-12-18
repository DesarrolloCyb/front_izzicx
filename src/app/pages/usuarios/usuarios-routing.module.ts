import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/_shared/layout/layout/layout.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { UsuariosComponent } from './usuarios-dashboard/usuarios.component';



const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Dashboard Usuarios' },
    component: LayoutComponent,
    children: [
      { path: '', component: UsuariosComponent,data: { breadcrumb: 'Usuarios' }}, 
      { path: 'nuevo', component: NuevoUsuarioComponent,data: { breadcrumb: 'Nuevo'  }}, 
      { path: 'detalle/:userID', component: DetalleUsuarioComponent,data: { breadcrumb: 'Detalle' } }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
