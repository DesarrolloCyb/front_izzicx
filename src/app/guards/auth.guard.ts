import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,) { }
  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let permisos: any = {
    "admin":['extraccion','home','ajustes','notDone','depuracion','limpieza','reporteFidelizacion','reportes','ajustesYcambioServicio','robots','ordenes'],
    "Reporte":['home','reporteFidelizacion'],
    "Extraccion":['home','extraccion'],
    "Depuracion":['home','depuracion','reportes'],
    "Ajustes":['home','ajustesYcambioServicio','reportes'],
    "AjustesNotDone":['home','notDone','reportes'],
    "testAjustes1":['home','ajustes','reportes','ordenes'],
    "eBarrera":['extraccion','home','ajustes','notDone','depuracion','reporteFidelizacion','reportes','robots'],
    "testReportes":['home','reportes'],
    "ACS":['home','ajustesYcambioServicio'],
    "recuperadores":['home','limpieza'],
    }
    console.log("aca", route.url[0].path);
    
    let usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")
	console.log("rol",route.url[0].path);

    if (usuarioInfo?.role) {

      if (permisos[usuarioInfo?.role].includes(route.url[0].path)) { return true }
    }

    

    this.router.navigate(['/404'], { skipLocationChange: true });
    return false;
  }

}
