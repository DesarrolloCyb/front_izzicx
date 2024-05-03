import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../../_shared/layout/layout/layout.component';
import { RecuperadoresComponent } from './recuperadores/recuperadores.component';
import { SeriesComponent } from './series/series.component';
import { UsuariosbotsComponent } from './usuariosbots/usuariosbots.component';
import { EditarusrbotComponent } from './editarusrbot/editarusrbot.component';

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
	{
		path: 'usuariosbots',
		data: { breadcrumb: 'Usuarios bots' },
		component: LayoutComponent,
		children: [
			{ path: '', component: UsuariosbotsComponent },
		  	{ path: 'editar', component: EditarusrbotComponent }
		],
	  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimpiezaRoutingModule { }
