import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/_shared/layout/layout/layout.component';
import { CreacionOrdenesComponent } from './creacion-ordenes/creacion-ordenes.component';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';

const routes: Routes = [
  {
    path: 'creacion-Orden', 
    data: { breadcrumb: 'Creación de Ordenes' },
    component: LayoutComponent,
    children: [{ path: '', component: CreacionOrdenesComponent }],
  },
  {
    path: 'consulta-creacion-Orden', 
    data: { breadcrumb: 'Consulta de Creación de Ordenes' },
    component: LayoutComponent,
    children: [{ path: '', component: PantallaConsultaComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreaordenRoutingModule { }
