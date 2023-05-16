import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { BasesDepuradasComponent } from './bases-depuradas/bases-depuradas.component';
import { DashboardDepuracionComponent } from './dashboard-depuracion/dashboard-depuracion.component';
import { BasesCanceladasComponent } from './bases-canceladas/bases-canceladas.component';
import { PantallaConsultaComponent } from './pantalla-consulta/pantalla-consulta.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [{ path: '', component: DashboardDepuracionComponent }],
	},
	{
		path: 'bases',
		component: LayoutComponent,
		children: [{ path: '', component: BasesDepuradasComponent }],
	},
	{
		path: 'basesCanceladas',
		component: LayoutComponent,
		children: [{ path: '', component: BasesCanceladasComponent }],
	},
	{
		path: 'consulta',
		component: LayoutComponent,
		children: [{ path: '', component: PantallaConsultaComponent }],
	},
	{
		path: 'reporte',
		component: LayoutComponent,
		children: [{ path: '', component: ReportesComponent }],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepuracionRoutingModule { }
