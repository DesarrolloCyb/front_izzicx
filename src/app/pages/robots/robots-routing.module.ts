import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/_shared/layout/layout/layout.component';
import { RobotsComponent } from './robots-dasboard/robots.component';
import { RobotsNuevoComponent } from './robots-nuevo/robots-nuevo.component';




const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Dashboard Robots' },
    component: LayoutComponent,
    children: [{ path: '', component: RobotsComponent, }, { path: 'nuevo', component: RobotsNuevoComponent }],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RobotsRoutingModule { }
