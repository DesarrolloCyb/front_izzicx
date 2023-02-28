import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { DashboardExtraccionComponent } from './dashboard-extraccion/dashboard-extraccion.component';
import { VisualizacionComponent } from './visualizacion/visualizacion.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [{ path: '', component: DashboardExtraccionComponent }],
	},
	{
		path: 'visualizacion',
		component: LayoutComponent,
		children: [{ path: '', component: VisualizacionComponent }],
	},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraccionRoutingModule { }
