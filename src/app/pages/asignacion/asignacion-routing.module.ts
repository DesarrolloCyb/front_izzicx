import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { DashboardAsignacionComponent } from './dashboard-asignacion/dashboard-asignacion.component';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';
import { ParametrosconfigComponent } from './parametrosconfig/parametrosconfig.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [{ path: '', component: DashboardAsignacionComponent }],
	},
	{
		path: 'consulta',
		component: LayoutComponent,
		children: [{ path: '', component: PantallaConsultaComponent }],
	},
	{
		path: 'parametros',
		component: LayoutComponent,
		children: [{ path: '', component: ParametrosconfigComponent }],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionRoutingModule { }
