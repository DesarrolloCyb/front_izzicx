import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MenuitemComponent } from './_shared/layout/menuitem/menuitem.component';
import { ProfilemenuComponent } from './_shared/layout/profilemenu/profilemenu.component';
import { BreadcrumbComponent } from './_shared/layout/breadcrumb/breadcrumb.component';
import { MenuComponent } from './_shared/layout/menu/menu.component';
import { SidebarComponent } from './_shared/layout/sidebar/sidebar.component';
import { LayoutComponent } from './_shared/layout/layout/layout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './_shared/layout/topbar/topbar.component';
import { SharedModule } from './_shared/modules/shared/shared.module';
import { NotfoundComponent } from './_shared/layout/notfound/notfound.component';
import { LoginModule } from './components/login/login/login.module';
import { RegistrarUsuarioModule } from './components/registrar-usuario/registrar-usuario.module';
import { ActivaCuentaModule } from './components/activa-cuenta/activa-cuenta.module';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { DashboardModule } from './components/dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LayoutComponent,
    SidebarComponent,
    MenuComponent,
    BreadcrumbComponent,
    ProfilemenuComponent,
    MenuitemComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    LoginModule,
    RegistrarUsuarioModule,
    ActivaCuentaModule,
    SidenavModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}