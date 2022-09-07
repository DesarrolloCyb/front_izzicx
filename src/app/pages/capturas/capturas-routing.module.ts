import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'app/_shared/layout/layout/layout.component';
import { CancelacionComponent } from './cancelacion/cancelacion.component';


const routes: Routes = [
  {
    path: 'cancelacion',
    data: { breadcrumb: 'Cancelación' },
    component: LayoutComponent,
    children: [{ path: '', component: CancelacionComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturasRoutingModule { }
