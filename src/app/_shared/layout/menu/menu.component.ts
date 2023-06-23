import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  model: any[] = [

  ];
  menus: any[] = [
    {
      label: 'Cyber Room',
      key: "home",
      icon: 'pi pi-home',
    //   routerLink: ['/dashboard'],
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/home'],
        }

      ]
    },
    {
      label: 'Extracción',
      key: "extraccion",
    //   icon: 'pi pi-fw pi-compass',
    //   routerLink: ['/capturas'],
      items: [
        {
          label: 'Home',
        //   icon: 'pi pi-fw pi-filter',
          icon: 'pi pi-fw pi-arrow-up-right',
          routerLink: ['/extraccion'],
        },
        // {
        //   label: 'Solicitud de Cancelación',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/solicitud-cancelacion'],
        // },
        // {
        //   label: 'Reactivación',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/reactivacion'],
        // },
        // {
        //   label: 'Servicios c/s costo',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/servicioscosto'],
        // },
        // {
        //   label: 'Reembolso',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/reembolso'],
        // },
        // {
        //   label: 'Cambio de Paquete',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/cambioPaquete'],
        // },
        // {
        //   label: 'Cambio de Esquema',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/cambioEsquema'],
        // },
      ]
    },
	{
		label: 'Ajustes', // Ajustes -asignacion
		key: "ajustes",
		icon: 'pi pi-fw pi-compass',
	  //   routerLink: ['/capturas'],
		items: [
		  {
			label: 'Importar Casos de Negocio Cobranza',
			icon: 'pi pi-fw pi-check-square',
		    routerLink: ['/ajustes'],
		  },
		  {
		    label: 'Consulta registros de ajustes',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/ajustes/consulta'],
		  },
		  {
		    label: 'Parámetros',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/ajustes/parametros'],
		  },
      {
		    label: 'Importar Base sin Validación',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/ajustes/baseSinValidacion'],
		  },
      {
		    label: 'Consultar Base sin Validacion',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/ajustes/consultaSinValidacion'],
		  },
		  // {
		  //   label: 'Servicios c/s costo',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/servicioscosto'],
		  // },
		  // {
		  //   label: 'Reembolso',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/reembolso'],
		  // },
		  // {
		  //   label: 'Cambio de Paquete',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioPaquete'],
		  // },
		  // {
		  //   label: 'Cambio de Esquema',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioEsquema'],
		  // },
		]
	  },
	  {
		label: 'NotDone', // NOTDONE - caso-negocio
		key: "notDone",
		// icon: 'pi pi-fw pi-compass',
	  //   routerLink: ['/capturas'],
		items: [
		  {
			label: 'Importar Bases NotDone',
			icon: 'pi pi-fw pi-briefcase',
		    routerLink: ['/notDone'],
		  },
		  {
		    label: 'Consulta Registros NotDone',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/notDone/consulta'],
		  },
      {
		    label: 'Parámetros',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/notDone/parametros'],
		  },

		  // {
		  //   label: 'Reactivación',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/reactivacion'],
		  // },
		  // {
		  //   label: 'Servicios c/s costo',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/servicioscosto'],
		  // },
		  // {
		  //   label: 'Reembolso',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/reembolso'],
		  // },
		  // {
		  //   label: 'Cambio de Paquete',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioPaquete'],
		  // },
		  // {
		  //   label: 'Cambio de Esquema',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioEsquema'],
		  // },
		]
	  },
	  {
		label: 'Depuración',
		key: "depuracion",
		icon: 'pi pi-fw pi-compass',
	  //   routerLink: ['/capturas'],
		items: [
		  {
			label: 'Extracción',
			icon: 'pi pi-fw pi-folder-open',
		    routerLink: ['/depuracion'],
		  },
      {
        label: 'Bases depuradas',
        icon: 'pi pi-fw pi-folder-open',
          routerLink: ['/depuracion/bases'],
      },
		  {
		    label: 'Bases Cancelación OS',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/depuracion/basesCanceladas'],
		  },
		  {
		    label: 'Pantalla Consulta',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/depuracion/consulta'],
		  },
		  {
		    label: 'Prefijos de Marcación',
		    icon: 'pi pi-fw pi-exclamation-triangle',
		    routerLink: ['/depuracion/prefijos'],
		  },
		  // {
		  //   label: 'Reembolso',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/reembolso'],
		  // },
		  // {
		  //   label: 'Cambio de Paquete',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioPaquete'],
		  // },
		  // {
		  //   label: 'Cambio de Esquema',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioEsquema'],
		  // },
		]
	  },
	  {
		label: 'Reporte Fidelización',
		key: "reporteFidelizacion",
		icon: 'pi pi-fw pi-compass',
	  //   routerLink: ['/capturas'],
		items: [
		  {
			label: 'Home',
			icon: 'pi pi-fw pi-chart-bar',
		    routerLink: ['/reporteFidelizacion'],
		  },
		  // {
		  //   label: 'Solicitud de Cancelación',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/solicitud-cancelacion'],
		  // },
		  // {
		  //   label: 'Reactivación',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/reactivacion'],
		  // },
		  // {
		  //   label: 'Servicios c/s costo',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/servicioscosto'],
		  // },
		  // {
		  //   label: 'Reembolso',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/reembolso'],
		  // },
		  // {
		  //   label: 'Cambio de Paquete',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioPaquete'],
		  // },
		  // {
		  //   label: 'Cambio de Esquema',
		  //   icon: 'pi pi-fw pi-exclamation-triangle',
		  //   routerLink: ['/capturas/cambioEsquema'],
		  // },
		]
	  },
    {
      label: 'Reportes',
      key: "reportes",
      icon: 'pi pi-fw pi-compass',
      //   routerLink: ['/capturas'],
      items: [
        {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-folder-open',
          routerLink: ['/reportes'],
        },
        // {
        //   label: 'Solicitud de Cancelación',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/solicitud-cancelacion'],
        // },
        // {
        //   label: 'Reactivación',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/reactivacion'],
        // },
        // {
        //   label: 'Servicios c/s costo',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/servicioscosto'],
        // },
        // {
        //   label: 'Reembolso',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/reembolso'],
        // },
        // {
        //   label: 'Cambio de Paquete',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/cambioPaquete'],
        // },
        // {
        //   label: 'Cambio de Esquema',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/capturas/cambioEsquema'],
        // },
      ]
      },
      {
        label: 'Ajustes y Cambios de Servicios',
        key: "ajustesYcambioServicio",
        icon: 'pi pi-fw pi-compass',
        //   routerLink: ['/capturas'],
        items: [
          {
          label: 'Base de Datos Ajustes',
          icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/ajustesYcambioServicio/BDajustes'],
          },
          {
            label: 'Consulta',
            icon: 'pi pi-fw pi-exclamation-triangle',
            routerLink: ['/ajustesYcambioServicio/consulta'],
          },
          // {
          //   label: 'Estadísticas',
          //   icon: 'pi pi-fw pi-exclamation-triangle',
          //   routerLink: ['/ajustesYcambioServicio/estadisticas'],
          // },
          // {
          //   label: 'Reporte',
          //   icon: 'pi pi-fw pi-exclamation-triangle',
          //   routerLink: ['/ajustesYcambioServicio/reporte'],
          // },
          // {
          //   label: 'Servicios c/s costo',
          //   icon: 'pi pi-fw pi-exclamation-triangle',
          //   routerLink: ['/capturas/servicioscosto'],
          // },
          // {
          //   label: 'Reembolso',
          //   icon: 'pi pi-fw pi-exclamation-triangle',
          //   routerLink: ['/capturas/reembolso'],
          // },
          // {
          //   label: 'Cambio de Paquete',
          //   icon: 'pi pi-fw pi-exclamation-triangle',
          //   routerLink: ['/capturas/cambioPaquete'],
          // },
          // {
          //   label: 'Cambio de Esquema',
          //   icon: 'pi pi-fw pi-exclamation-triangle',
          //   routerLink: ['/capturas/cambioEsquema'],
          // },
        ]
        },
    
    // {
    //   label: 'Capturas atencion a clientes',
    //   key: "capturasA",
    //   icon: 'pi pi-fw pi-android',
    //   routerLink: ['/capturas'],
    //   items: [
    //     {
    //       label: 'Temporadas',
    //       icon: 'pi pi-fw pi-exclamation-triangle',
    //       routerLink: ['/capturasAtc/temporadas'],
    //     },
    //     // {
    //     //   label: 'RAySE PosPago Prepago',
    //     //   icon: 'pi pi-fw pi-exclamation-triangle',
    //     //   routerLink: ['/capturasAtc/PostPagoPrepago'],
    //     // },
    //     {
    //       label: 'Bolsa de datos',
    //       icon: 'pi pi-fw pi-exclamation-triangle',
    //       routerLink: ['/capturasAtc/bolsaDatos'],
    //     },
    //     {
    //       label: 'Garantia',
    //       icon: 'pi pi-fw pi-exclamation-triangle',
    //       routerLink: ['/capturasAtc/garantia'],
    //     },


    //   ]
    // },

    {
      label: 'Robots',
      key: "robots",
      icon: 'pi pi-fw pi-android',
      routerLink: ['/robots'],
      items: [
        {
          label: 'Actividad',
          icon: 'pi pi-fw pi-tablet',
          routerLink: ['/robots/'],
        },
        {
          label: 'Crear nuevo',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['/robots/nuevo'],
        },
      ]
    },
    // ///--------------------------------------------------///
    // {
    //   label: 'Reportes',
    //   key: "reportes",
    //   icon: 'pi pi-fw pi-compass',
    //   routerLink: ['/capturas'],
    //   items: [
    //     {
    //       label: 'Generar',
    //       icon: 'pi pi-fw pi-chart-bar',
    //       routerLink: ['/reportes'],
    //     },
    //   ]
    // },
    // {
    //   label: 'Usuarios',
    //   key: "usuarios",
    //   icon: 'pi pi-fw pi-users',
    //   routerLink: ['/usuarios'],
    //   items: [
    //     {
    //       label: 'Listado',
    //       icon: 'pi pi-fw pi-list',
    //       routerLink: ['/usuarios'],
    //     },
    //     {
    //       label: 'Nuevo',
    //       icon: 'pi pi-fw pi-user-plus',
    //       routerLink: ['/usuarios/nuevo'],
    //     },
    //   ]
    // },

  ]
  ngOnInit() {


    let permisos: any = {
      "admin":['extraccion','home','ajustes','notDone','depuracion','reporteFidelizacion','reportes','ajustesYcambioServicio','robots'],
      "Reporte":['home','reporteFidelizacion'],
      "Extraccion":['home','extraccion'],
      "Depuracion":['home','depuracion'],
      "Ajustes":['home','ajustesYcambioServicio'],
      "AjustesNotDone":['home','ajustes','notDone'],
      //   "SUPERVISOR TROUBLESHOOTING CELULAR":['capturasA','home','reportes'],
    //   "ESPECIALISTA TROUBLESHOOTING CELULAR":['capturasA'],
    //   "SUPERVISOR CALL CENTER REPARACIONES":['capturasA','home','reportes'],
    //   "EJECUTIVO ATENCION PREPAGO":['capturasA'],
    //   "GERENTE REPARACIONES VETV":['capturasA','home','reportes'],
    //   "COORDINADOR REPARACIONES":['home','reportes'],
    //   "SUPERVISOR ATENCION CC MX":['capturasA','home','reportes'],
    //   "COORDINADOR ATENCION CC MX":['home','reportes'],
    //   "ASESOR ATENCION CC MX":['home','reportes'],
    //   "EJECUTIVO ATENCION A CLIENTE":['capturasA'],
    //   "ASESOR RETENCION VETV":['home','reportes'],
    //   "GERENTE RETENCION INBOUND":['home','capturasR','capturasA','robots','reportes','usuarios'],
    //   "SUPERVISOR RETENCION WEB":['home','capturasR','reportes'],
    //   "SUPERVISOR RETENCION INBOUND VETV":['home','capturasR','reportes'],
    //   "SUPERVISOR RETENCION INBOUND":['home','capturasR','reportes'],
    //   "ESPECIALISTA RETENCION WEB":['capturasR'],
    //   "ESPECIALISTA RETENCION VETV":['capturasR'],
    //   "ESPECIALISTA RETENCION INBOUND":['capturasR'],
    //   "ESPECIALISTA RETENCION CHAT":['capturasR'],
    //   "GERENTE ATENCION A CLIENTES":['home','reportes'], //despues de este las dos graficas
    //   "SUPERVISOR ATENCION A CLIENTES INTERNO":['home','reportes'],
    //   "ASESOR CONTROL INFORMACION":['home','reportes'],
    //   "SUPERVISOR GESTION EDP":['home','reportes'],
    //   "SUPERVISOR ESTRATEGIA OPERATIVA":['home','reportes'],
    //   "ESPECIALISTA ESTRATEGIA OPERATIVA":['home'],
    //   "GERENTE MESA DE CONTROL":['home','reportes'],
    //   "SUPERVISOR MESA DE CONTROL":['home','reportes'],
    //   "SUPERVISOR MESA CONTROL DE DOCUMENTOS":['home','reportes'],
    //   "Resp: MOISES AVILA SOTO":['home','capturasR','capturasA','robots','reportes','usuarios'],
    //   "EJECUTIVO ATENCION PREPAGO BRONCE J":['home','capturasA'],
    //   "EJECUTIVO ATENCION PREPAGO BRONCE S":['home','capturasA'],
    //   "EJECUTIVO REPARACIONES JR":['home','capturasA'],
    //   "EJECUTIVO ATENCION PREPAGO BRONCE":['home','capturasA'],
    //   "EJECUTIVO ATENCION A CLIENTE MX JR":['home','capturasA'],
    //   "EJECUTIVO ATENCION A CLIENTE MX SENIOR":['home','capturasA'],
    //   "EJECUTIVO ATENCION A CLIENTE MX JR":['home','capturasA'],
    //   "SUPERVISOR ATENCION CC MX":['capturasA','home','reportes'],
    //   "EJECUTIVO ATENCION POSPAGO BRONCE":['home','capturasA'],
    //   "EJECUTIVO ATENCION POSPAGO ORO":['home','capturasA'],
    //   "ESPECIALISTA RETENCION POSPAGO BRONCE":['home','capturasR'],
    //   "EJECUTIVO ATENCION POSPAGO PLATA":['home','capturasA'],
    //   "EJECUTIVO ATENCION PREPAGO PLATA":['home','capturasA'],
    //   "EJECUTIVO ATENCION PREPAGO ORO":['home','capturasA'],
    //   "ESPECIALISTA RETENCION PREPAGO BRONCE":['home','capturasR']
    //   "":['home']
    }
    this.model = [];

    /**
     * {"userID":241,"firstName":"usrconfbot","lastName":null,"email":"usrconfbot","mobile":null,"gender":null,"role":"1","pWd":"","memberSince":"2022-11-06T17:10:35.6017627",
     */

    let usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")

    // this.model.push(
    // )
    this.menus.forEach((elemento) => {


      // console.log(elemento)
      if (permisos[usuarioInfo?.role].includes(elemento.key)) {
        this.model.push(elemento)
      }
    })

  }
}
