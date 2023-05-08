import { CapturasModule } from './pages/capturas/capturas.module';
import { NotfoundComponent } from './_shared/layout/notfound/notfound.component';
import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './_shared/layout/layout/layout.component';
// import { ReportesRoutingModule } from './pages/reportes/reportes-routing.module';
import { AuthGuard } from './guards/auth.guard';

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { breadcrumb: 'Home' },
    canActivate: [AuthGuard],
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
    path: 'asignacion',
    data: { breadcrumb: 'Asignación' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/asignacion/asignacion.module').then((m) => m.AsignacionModule),
  },
  {
    path: 'casoNegocio',
    data: { breadcrumb: 'Caso de Negocio y Ordenes' },
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/casos-negocio/casos-negocio.module').then((m) => m.CasosNegocioModule),
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
//   { path: 'robots', data: { breadcrumb: 'Robots' }, loadChildren: () => import('./pages/robots/robots.module').then(m => m.RobotsModule) },
//   { path: 'usuarios', data: { breadcrumb: 'Usuarios' }, loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },

//   //DEMOS
//   {
//     path: 'demo',
//     component: LayoutComponent,
//     children: [
//       {
//         path: 'uikit',
//         data: { breadcrumb: 'UI Kit' },
//         loadChildren: () =>
//           import('./demo/components/uikit/uikit.module').then(
//             (m) => m.UIkitModule
//           ),
//       },
//       {
//         path: 'utilities',
//         data: { breadcrumb: 'Utilities' },
//         loadChildren: () =>
//           import('./demo/components/utilities/utilities.module').then(
//             (m) => m.UtilitiesModule
//           ),
//       },
//       {
//         path: 'pages',
//         data: { breadcrumb: 'Pages' },
//         loadChildren: () =>
//           import('./demo/components/pages/pages.module').then(
//             (m) => m.PagesModule
//           ),
//       },
//       {
//         path: 'profile',
//         data: { breadcrumb: 'User Management' },
//         loadChildren: () =>
//           import('./demo/components/profile/profile.module').then(
//             (m) => m.ProfileModule
//           ),
//       },
//       {
//         path: 'documentation',
//         data: { breadcrumb: 'Documentation' },
//         loadChildren: () =>
//           import('./demo/components/documentation/documentation.module').then(
//             (m) => m.DocumentationModule
//           ),
//       },
//       {
//         path: 'blocks',
//         data: { breadcrumb: 'Prime Blocks' },
//         loadChildren: () =>
//           import('./demo/components/primeblocks/primeblocks.module').then(
//             (m) => m.PrimeBlocksModule
//           ),
//       },
//       {
//         path: 'ecommerce',
//         data: { breadcrumb: 'E-Commerce' },
//         loadChildren: () =>
//           import('./demo/components/ecommerce/ecommerce.module').then(
//             (m) => m.EcommerceModule
//           ),
//       },
//       {
//         path: 'apps',
//         data: { breadcrumb: 'Apps' },
//         loadChildren: () =>
//           import('./demo/components/apps/apps.module').then(
//             (m) => m.AppsModule
//           ),
//       },
//     ],
//   },
  { path: '**', redirectTo: '/404' },
  {
    path: '404',
    component: NotfoundComponent,
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
