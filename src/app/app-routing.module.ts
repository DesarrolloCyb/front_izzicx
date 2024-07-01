import { NotfoundComponent } from './_shared/layout/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from '../app/components/login/login/login.component';
import { RegistrarUsuarioComponent } from '../app/components/registrar-usuario/registrar-usuario.component';
import { ActivaCuentaComponent } from './components/activa-cuenta/activa-cuenta.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};
const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: '/dashboard/izzi',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/izzi',
    data: { breadcrumb: 'Home' },
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'extraccion',
    data: { breadcrumb: 'Extracción' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/extraccion/extraccion.module').then((m) => m.ExtraccionModule),
  },
  {
    path: 'ajustes',
    data: { breadcrumb: 'Ajustes' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/asignacion/asignacion.module').then((m) => m.AsignacionModule),
  },
  {
    path: 'notDone',
    data: { breadcrumb: 'NotDone' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/casos-negocio/casos-negocio.module').then((m) => m.CasosNegocioModule),
  },
  {
    path: 'limpieza',
    data: { breadcrumb: 'limpieza' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/limpieza/limpieza.module').then((m) => m.LimpiezaModule),
  },
  {
    path: 'depuracion',
    data: { breadcrumb: 'Depuración'},
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/depuracion/depuracion.module').then((m) => m.DepuracionModule),
  },
  {
    path: 'reporteFidelizacion',
    data: { breadcrumb: 'Reporte Fidelización'},
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/reporte-fidelizacion/reporte-fidelizacion.module').then((m) => m.ReporteFidelizacionModule),
  },
  {
    path: 'reportes',
    data: { breadcrumb: 'Reportes'},
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/reportes-izzi/reportes-izzi.module').then((m) => m.ReportesIzziModule),
  },
  {
    path: 'ajustesYcambioServicio',
    data: { breadcrumb: 'Ajustes y Cambio de Servicio'},
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/ajustes-ycambio-servicios/ajustes-ycambio-servicios.module').then((m) => m.AjustesYcambioServiciosModule),
  },
  {
    path: 'ordenes',
    data: { breadcrumb: 'Creación de Ordenes'},
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/creaorden/creaorden.module').then((m) => m.CreaordenModule),
  },
  { path: 'robots', data: { breadcrumb: 'Robots' }, loadChildren: () => import('./pages/robots/robots.module').then(m => m.RobotsModule) },
  {
    path: '404',
    component: NotfoundComponent,
  },

  //componentes de Mariana
  // {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistrarUsuarioComponent},
  {path: 'activar', component: ActivaCuentaComponent},
  {
    path: 'dashboard/mariana', component: SidenavComponent, 
    // canActivate: [AuthGuardService],
    children: [
      {path: '', component: DashboardComponent},
      // {path: 'inicial', component: InicialComponent},
      // {path: 'cargar', component: CargarComponent},
      // {path: 'cargar/individual', component: CargarComponent},
      // {path: 'cargar/masiva', component: CargarComponent},
      // {path: 'cargar', component: CargarComponent},
      // {path: 'analizar', component: AnalizarComponent},
      // {path: 'analizar/resultados/:tempName/:guia/:origen', component: ResultadosComponent},
      // {path: 'generar', component: ReporteComponent},
      // {path: 'programar', component: ProgramarComponent},
      // {path: 'parametros', component: ParametrosComponent},
      // {path: 'subcategorias', component: CategoriasComponent},
      // {path: 'prueba', component: PruebaComponent},
      // {path: 'cargar-plantilla', component: CargarPlantillasComponent},
      // { path: 'asignacion', loadChildren: () => import('./components/asignacion/asignacion-routing.module').then(m => m.AsignacionRoutingModule) }
    ]
  },

  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
