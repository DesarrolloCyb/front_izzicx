import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { DashboardExtraccionComponent } from './dashboard-extraccion/dashboard-extraccion.component';
import { AutomatizadosComponent } from './automatizados/automatizados.component';

const routes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		children: [{ path: '', component: DashboardExtraccionComponent }],
	},
	{
		path: 'automatizados',
		component: LayoutComponent,
		children: [{ path: '', component: AutomatizadosComponent }],
	},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraccionRoutingModule { }
