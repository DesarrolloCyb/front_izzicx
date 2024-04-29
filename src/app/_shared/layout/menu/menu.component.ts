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
          label: 'Dashboard',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/home'],
        }
      ]
    },
    {
      label: 'Extracción',
      key: "extraccion",
      items: [
        {
          label: 'Extracciones Manual',
          icon: 'pi pi-fw pi-external-link',
          routerLink: ['/extraccion'],
        },
        {
          label: 'Extracciones Automatizadas',
          icon: 'pi pi-fw pi-exclamation-triangle',
          routerLink: ['/extraccion/automatizados'],
        },
      ]
    },
	{
		label: 'Ajustes',
		key: "ajustes",
		icon: 'pi pi-fw pi-compass',
		items: [
      {
        label: 'Con Validación',
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
          },
          {
            label: 'Reprocesar',
            icon: 'pi pi-fw pi-sync',
            routerLink: ['/ajustes/Reprocesarsinvalidacion'],
          }
        ]
		  },
		]
	  },
	  {
		label: 'NotDone',
		key: "notDone",
		items: [
      {
        label: 'Con Validación',
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
		]
	  },
	  {
		label: 'Depuración',
		key: "depuracion",
		icon: 'pi pi-fw pi-compass',
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
      {
		    label: 'Hobs a Depurar',
		    icon: 'pi pi-fw pi-spinner',
		    routerLink: ['/depuracion/HobsDepuracion'],
		  },
      {
		    label: 'Estado de Fallas Depuraion',
		    icon: 'pi pi-fw pi-ban',
		    routerLink: ['/depuracion/FallasDepuracion'],
		  },
		]
	  },
	  {
		label: 'Limpieza',
		key: "limpieza",
		icon: 'pi pi-fw pi-eraser',
		items: [
		  {
			label: 'Series',
			icon: 'pi pi-fw pi-server',
		    routerLink: ['/limpieza/series'],
		  },
      // {
      //   label: 'Recuperadores',
      //   icon: 'pi pi-fw pi-download',
      //     routerLink: ['/limpieza/recuperadores'],
      //   },
		]
	  },
	  {
		label: 'Reporte Fidelización',
		key: "reporteFidelizacion",
		icon: 'pi pi-fw pi-compass',
		items: [
		  {
			label: 'Home',
			icon: 'pi pi-fw pi-chart-bar',
		    routerLink: ['/reporteFidelizacion'],
		  },
		]
	  },
    {
      label: 'Reportes',
      key: "reportes",
      icon: 'pi pi-fw pi-compass',
      items: [
        {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-book',
          routerLink: ['/reportes'],
        },
      ]
      },
      {
        label: 'Ajustes y Cambios de Servicios',
        key: "ajustesYcambioServicio",
        icon: 'pi pi-fw pi-compass',
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
        ]
        },
        {
          label: 'Creación de OS',
          key: "ordenes",
          icon: 'pi pi-fw pi-compass',
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

  ]
  ngOnInit() {


    let permisos: any = {
      "admin":['extraccion','home','ajustes','notDone','depuracion','reporteFidelizacion','limpieza','reportes','ajustesYcambioServicio','robots','ordenes'],
      "Reporte":['home','reporteFidelizacion'],
      "Extraccion":['home','extraccion'],
      "Depuracion":['home','depuracion','reportes'],
      "Ajustes":['home','ajustesYcambioServicio','reportes'],
      "AjustesNotDone":['home','notDone','reportes'],
      "testAjustes1":['home','ajustes','reportes','ordenes'],
      "eBarrera":['extraccion','home','ajustes','notDone','depuracion','reporteFidelizacion','reportes','robots'],
      "testReportes":['home','reportes'],
      "ACS":['home','ajustesYcambioServicio'],
    }
    this.model = [];
    let usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")
    this.menus.forEach((elemento) => {


      // console.log(elemento)
      if (permisos[usuarioInfo?.role].includes(elemento.key)) {
        this.model.push(elemento)
      }
    })

  }
}
