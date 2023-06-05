import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/_shared/layout/layout/layout.component';
import { BaseDatosAjustesComponent } from './base-datos-ajustes/base-datos-ajustes.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';

const routes: Routes = [
  {
    path: 'BDajustes', 
    data: { breadcrumb: 'Base de Datos Ajustes' },
    component: LayoutComponent,
    children: [{ path: '', component: BaseDatosAjustesComponent }],
  },
  {
    path: 'estadisticas', 
    data: { breadcrumb: 'Estadisticas' },
    component: LayoutComponent,
    children: [{ path: '', component: EstadisticasComponent }],
  },
  {
    path: 'reporte', 
    data: { breadcrumb: 'Reportes' },
    component: LayoutComponent,
    children: [{ path: '', component: ReporteComponent }],
  },
  {
    path: 'consulta', 
    data: { breadcrumb: 'Pantalla Consulta' },
    component: LayoutComponent,
    children: [{ path: '', component: PantallaConsultaComponent }],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesYcambioServiciosRoutingModule { }
