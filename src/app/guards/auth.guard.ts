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
      // "1": ["capturas"],
      // "2": ["capturas", "robots"],
      // "3": ["capturas", "robots", "reportes", "usuarios"], //Adminstrador

      // "1": ["capturas"], //agente retencion
      // "2": ["capturasAtn"],//agente agente atencion clientes
      // "3": [ "robots"],//robots
      // "4": [ "reportes"],//reportes
      // "5": ["capturas","capturasAtn", "robots", "reportes", "usuarios"]//administrador
      
      "SUPERVISOR TROUBLESHOOTING CELULAR":['capturasAtc','home','reportes'],
      "ESPECIALISTA TROUBLESHOOTING CELULAR":['capturasAtc'],
      "SUPERVISOR CALL CENTER REPARACIONES":['capturasAtc','home','reportes'],
      "EJECUTIVO ATENCION PREPAGO":['capturasAtc'],
      "GERENTE REPARACIONES VETV":['capturasAtc','home','reportes'],
      "COORDINADOR REPARACIONES":['home','reportes'],
      "SUPERVISOR ATENCION CC MX":['capturasAtc','home','reportes'],
      "COORDINADOR ATENCION CC MX":['home','reportes'],
      "ASESOR ATENCION CC MX":['home','reportes'],
      "EJECUTIVO ATENCION A CLIENTE":['capturasAtc'],
      "ASESOR RETENCION VETV":['home','reportes'],
      "GERENTE RETENCION INBOUND":['home','capturas','capturasAtc','robots','reportes','usuarios'],
      "SUPERVISOR RETENCION WEB":['home','capturas','reportes'],
      "SUPERVISOR RETENCION INBOUND VETV":['home','capturas','reportes'],
      "SUPERVISOR RETENCION INBOUND":['home','capturas','reportes'],
      "ESPECIALISTA RETENCION WEB":['capturas'],
      "ESPECIALISTA RETENCION VETV":['capturas'],
      "ESPECIALISTA RETENCION INBOUND":['capturas'],
      "ESPECIALISTA RETENCION CHAT":['capturas'],
      "GERENTE ATENCION A CLIENTES":['home','reportes'], //despues de este las dos graficas
      "SUPERVISOR ATENCION A CLIENTES INTERNO":['home','reportes'],
      "ASESOR CONTROL INFORMACION":['home','reportes'],
      "SUPERVISOR GESTION EDP":['home','reportes'],
      "SUPERVISOR ESTRATEGIA OPERATIVA":['home','reportes'],
      "ESPECIALISTA ESTRATEGIA OPERATIVA":['home'],
      "GERENTE MESA DE CONTROL":['home','reportes'],
      "SUPERVISOR MESA DE CONTROL":['home','reportes'],
      "SUPERVISOR MESA CONTROL DE DOCUMENTOS":['home','reportes'],
      "Resp: MOISES AVILA SOTO":['home','capturas','capturasAtc','robots','reportes','usuarios']
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
