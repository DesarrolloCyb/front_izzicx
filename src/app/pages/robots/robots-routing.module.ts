import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/_shared/layout/layout/layout.component';
import { RobotsComponent } from './robots-dasboard/robots.component';
import { RobotsEditarComponent } from './robots-editar/robots-editar.component';
import { RobotsNuevoComponent } from './robots-nuevo/robots-nuevo.component';




const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Dashboard Robots' },
    component: LayoutComponent,
    children: [
      { path: '', component: RobotsComponent,data: { breadcrumb: 'Actividad' }}, 
      { path: 'nuevo', component: RobotsNuevoComponent,data: { breadcrumb: 'Nuevo'  }}, 
      { path: 'editar/:idRobot', component: RobotsEditarComponent,data: { breadcrumb: 'Editar' } }],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotsRoutingModule { }
