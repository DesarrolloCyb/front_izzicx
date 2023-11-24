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
          label: 'Extracciones Manual',
        //   icon: 'pi pi-fw pi-filter',
          icon: 'pi pi-fw pi-external-link',
          routerLink: ['/extraccion'],
        },
        // {
        //   label: 'Extracciones Automatizadas',
        //   icon: 'pi pi-fw pi-exclamation-triangle',
        //   routerLink: ['/extraccion/automatizados'],
        // },
        {
          label: 'Extracciones Automatizadas',
          icon: 'pi pi-fw pi-exclamation-triangle',
          routerLink: ['/extraccion/automatizados'],
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
		label: 'Ajustes', // Ajustes -asignacion
		key: "ajustes",
		icon: 'pi pi-fw pi-compass',
	  //   routerLink: ['/capturas'],
		items: [
      {
        label: 'Con Validación',
        // icon: 'pi pi-fw pi-database',
        // routerLink: ['/ajustes'],
        items:[
          {
          label: 'Importar Casos de Negocio Cobranza',
          icon: 'pi pi-fw pi-database',
          routerLink: ['/ajustes'],
          },
          {
            label: 'Consulta registros de ajustes',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/ajustes/consulta'],
          },
          {
            label: 'Parámetros',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/ajustes/parametros'],
          },
          {
            label: 'Reprocesar',
            icon: 'pi pi-fw pi-sync',
            routerLink: ['/ajustes/reprocesar'],
          },
        ]
      }, 
      {
		    label: 'Sin Validación',
		    // icon: 'pi pi-fw pi-database',
		    // routerLink: ['/ajustes/baseSinValidacion'],
        items:[
          {
            label: 'Importar Base sin Validación',
            icon: 'pi pi-fw pi-database',
            routerLink: ['/ajustes/baseSinValidacion'],
          },
          {
            label: 'Consultar Base sin Validacion',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/ajustes/consultaSinValidacion'],
          }
        ]
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
        label: 'Con Validación',
        // icon: 'pi pi-fw pi-database',
        // routerLink: ['/notDone'],
        items:[
          {
            label: 'Importar Bases NotDone',
            icon: 'pi pi-fw pi-database',
              routerLink: ['/notDone'],
            },
            {
              label: 'Consulta Registros NotDone',
              icon: 'pi pi-fw pi-search',
              routerLink: ['/notDone/consulta'],
            },
            {
              label: 'Parámetros',
              icon: 'pi pi-fw pi-cog',
              routerLink: ['/notDone/parametros'],
            }
        ]
      },
      {
		    label: 'Sin Validación',
		    // icon: 'pi pi-fw pi-database',
		    // routerLink: ['/notDone/cancelacionSinValidacion'],
        items:[
          {
            label: 'Cancelación Sin Validación',
            icon: 'pi pi-fw pi-database',
            routerLink: ['/notDone/cancelacionSinValidacion'],
          },
          {
            label: 'Consulta Cancelación Sin Validación',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/notDone/consultaCancelacionSinValidacion'],
          },
          {
            label: 'Casos de Negocio Sin Validación ',
            icon: 'pi pi-fw pi-database',
            routerLink: ['/notDone/CasosNegocioSinValidacion'],
          },
          {
            label: 'Consulta Casos de Negocio Sin Validación ',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/notDone/consultaCasosNegocioSinValidacion'],
          },
        ]
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
		label: 'Depuración',
		key: "depuracion",
		icon: 'pi pi-fw pi-compass',
	  //   routerLink: ['/capturas'],
		items: [
		  {
			label: 'Extracción',
			icon: 'pi pi-fw pi-external-link',
		    routerLink: ['/depuracion'],
		  },
      {
        label: 'Bases depuradas',
        icon: 'pi pi-fw pi-list',
          routerLink: ['/depuracion/bases'],
      },
		  {
		    label: 'Bases Cancelación OS',
		    icon: 'pi pi-fw pi-database',
		    routerLink: ['/depuracion/basesCanceladas'],
		  },
		  {
		    label: 'Pantalla Consulta',
		    icon: 'pi pi-fw pi-search',
		    routerLink: ['/depuracion/consulta'],
		  },
		  {
		    label: 'Prefijos de Marcación',
		    icon: 'pi pi-fw pi-phone',
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
        icon: 'pi pi-fw pi-book',
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
          icon: 'pi pi-fw pi-database',
            routerLink: ['/ajustesYcambioServicio/BDajustes'],
          },
          {
            label: 'Consulta Ajustes',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/ajustesYcambioServicio/consulta'],
          },
          {
            label: 'Migraciones Lineales',
            icon: 'pi pi-fw pi-database',
            routerLink: ['/ajustesYcambioServicio/migracionesLineales'],
          },
          {
            label: 'Consulta Migraciones Lineales',
            icon: 'pi pi-fw pi-search',
            routerLink: ['/ajustesYcambioServicio/consultaMigracionesLineales'],
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
          label: 'Creación de OS',
          key: "ordenes",
          icon: 'pi pi-fw pi-compass',
          //   routerLink: ['/capturas'],
          items: [
            {
            label: 'Base Creación de Ordenes',
            icon: 'pi pi-fw pi-database',
              routerLink: ['/ordenes/creacion-Orden'],
            },
            {
              label: 'Consulta Creación de Ordenes',
              icon: 'pi pi-fw pi-database',
                routerLink: ['/ordenes/consulta-creacion-Orden'],
            },
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
          label: 'Actividad Robots',
          icon: 'pi pi-fw pi-tablet',
          routerLink: ['/robots/'],
        },
        {
          label: 'Crear nuevo Robot',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['/robots/nuevo'],
        },
        {
          label: 'Actividad Procesos',
          icon: 'pi pi-fw pi-tablet',
          routerLink: ['/robots/proceso'],
        },
        {
          label: 'Crear nuevo Proceso',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['/robots/proceso/nuevo'],
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
      "admin":['extraccion','home','ajustes','notDone','depuracion','reporteFidelizacion','reportes','ajustesYcambioServicio','robots','ordenes'],
      "Reporte":['home','reporteFidelizacion'],
      "Extraccion":['home','extraccion'],
      "Depuracion":['home','depuracion','reportes'],
      "Ajustes":['home','ajustesYcambioServicio','reportes'],
      "AjustesNotDone":['home','notDone','reportes'],
      "testAjustes1":['home','ajustes','reportes','ordenes'],
      "eBarrera":['extraccion','home','ajustes','notDone','depuracion','reporteFidelizacion','reportes','robots'],
      "testReportes":['home','reportes'],
      "ACS":['home','ajustesYcambioServicio']

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
    //   "ASESOR RETENCION VETV":['home','reportes'],http://localhost:4200/extraccion
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
