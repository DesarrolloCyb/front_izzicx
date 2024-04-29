import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { RecuperadoresComponent } from './recuperadores/recuperadores.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
//   {
// 		path: 'recuperadores',
//     data: { breadcrumb: 'recuperadores' },
// 		component: LayoutComponent,
// 		children: [{ path: '', component: RecuperadoresComponent }],
// 	},
  {
		path: 'series',
    data: { breadcrumb: 'series' },
		component: LayoutComponent,
		children: [{ path: '', component: SeriesComponent }],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimpiezaRoutingModule { }
