import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  model: any[] = [];

  ngOnInit() {
    this.model = [
      {

///--------------------------------------------------///
        label: 'Cyber Room',
        icon: 'pi pi-home',

        items: [
          {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/home'],
          },

          {
            label: 'Configuración',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/configuración'],
          },
        ],
      },
///--------------------------------------------------///
      {
        label: 'Capturas',
        icon: 'pi pi-fw pi-compass',
        routerLink: ['/capturas'],
        items: [
          {
            label: 'Cancelación',
            icon: 'pi pi-fw pi-file-excel',
            routerLink: ['/capturas/cancelacion'],
          },
          {
            label: 'Solicitud de Cancelación',
            icon: 'pi pi-fw pi-exclamation-triangle',
            routerLink: ['/capturas/solicitud-cancelacion'],
          },
        ]
      },
      {
        label: 'Robots',
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
///--------------------------------------------------///
{
  label: 'Reportes',
  icon: 'pi pi-fw pi-compass',
  routerLink: ['/capturas'],
  items: [
    {
      label: 'Generar',
      icon: 'pi pi-fw pi-chart-bar',
      routerLink: ['/reportes'],
    },
  ]
},
///--------------------------------------------------///
///-------------------UI KIT-------------------------------///
  
      // {
      //   label: 'UI Kit',
      //   icon: 'pi pi-fw pi-star-fill',
      //   routerLink: ['/uikit'],
      //   items: [
      //     {
      //       label: 'Form Layout',
      //       icon: 'pi pi-fw pi-id-card',
      //       routerLink: ['/demo/uikit/formlayout'],
      //     },
      //     {
      //       label: 'Input',
      //       icon: 'pi pi-fw pi-check-square',
      //       routerLink: ['/demo/uikit/input'],
      //     },
      //     {
      //       label: 'Float Label',
      //       icon: 'pi pi-fw pi-bookmark',
      //       routerLink: ['/demo/uikit/floatlabel'],
      //     },
      //     {
      //       label: 'Invalid State',
      //       icon: 'pi pi-fw pi-exclamation-circle',
      //       routerLink: ['/demo/uikit/invalidstate'],
      //     },
      //     {
      //       label: 'Button',
      //       icon: 'pi pi-fw pi-mobile',
      //       routerLink: ['/demo/uikit/button'],
      //       class: 'rotated-icon',
      //     },
      //     {
      //       label: 'Table',
      //       icon: 'pi pi-fw pi-table',
      //       routerLink: ['/demo/uikit/table'],
      //     },
      //     {
      //       label: 'List',
      //       icon: 'pi pi-fw pi-list',
      //       routerLink: ['/demo/uikit/list'],
      //     },
      //     {
      //       label: 'Tree',
      //       icon: 'pi pi-fw pi-share-alt',
      //       routerLink: ['/demo/uikit/tree'],
      //     },
      //     {
      //       label: 'Panel',
      //       icon: 'pi pi-fw pi-tablet',
      //       routerLink: ['/demo/uikit/panel'],
      //     },
      //     {
      //       label: 'Overlay',
      //       icon: 'pi pi-fw pi-clone',
      //       routerLink: ['/demo/uikit/overlay'],
      //     },
      //     {
      //       label: 'Media',
      //       icon: 'pi pi-fw pi-image',
      //       routerLink: ['/demo/uikit/media'],
      //     },
      //     {
      //       label: 'Menu',
      //       icon: 'pi pi-fw pi-bars',
      //       routerLink: ['/demo/uikit/menu'],
      //       routerLinkActiveOptions: { exact: false },
      //     },
      //     {
      //       label: 'Message',
      //       icon: 'pi pi-fw pi-comment',
      //       routerLink: ['/demo/uikit/message'],
      //     },
      //     {
      //       label: 'File',
      //       icon: 'pi pi-fw pi-file',
      //       routerLink: ['/demo/uikit/file'],
      //     },
      //     {
      //       label: 'Chart',
      //       icon: 'pi pi-fw pi-chart-bar',
      //       routerLink: ['/demo/uikit/charts'],
      //     },
      //     {
      //       label: 'Misc',
      //       icon: 'pi pi-fw pi-circle-off',
      //       routerLink: ['/demo/uikit/misc'],
      //     },
      //   ],
      // },

      // {
      //   label: 'Utilities',
      //   icon: 'pi pi-fw pi-compass',
      //   routerLink: ['/utilities'],
      //   items: [
      //     {
      //       label: 'PrimeIcons',
      //       icon: 'pi pi-fw pi-prime',
      //       routerLink: ['/demo/utilities/icons'],
      //     },
      //     {
      //       label: 'Colors',
      //       icon: 'pi pi-fw pi-palette',
      //       routerLink: ['/demo/utilities/colors'],
      //     },
      //     {
      //       label: 'PrimeFlex',
      //       icon: 'pi pi-fw pi-desktop',
      //       url: ['https://www.primefaces.org/primeflex/'],
      //       target: '_blank',
      //     },
      //   ],
      // },

      // {
      //   label: 'User Management',
      //   icon: 'pi pi-fw pi-user',
      //   items: [
      //     {
      //       label: 'List',
      //       icon: 'pi pi-fw pi-list',
      //       routerLink: ['/demo/profile/list'],
      //     },
      //     {
      //       label: 'Create',
      //       icon: 'pi pi-fw pi-plus',
      //       routerLink: ['/demo/profile/create'],
      //     },
      //   ],
      // },
    ];
  }
}
