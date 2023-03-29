import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { BasesDepuradasComponent } from './bases-depuradas/bases-depuradas.component';
import { DashboardDepuracionComponent } from './dashboard-depuracion/dashboard-depuracion.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepuracionRoutingModule { }
