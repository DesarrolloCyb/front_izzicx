import { Component, Input, OnInit } from '@angular/core';
import { INavbarData } from './helper';
import { DarkService } from '../../services/darkmode/dark.service';
import { Router } from '@angular/router';
import { navData } from './nav-dat';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private dark: DarkService, private router: Router) {}

  collapsed: boolean = false;

  navData = navData;

  mode: boolean | undefined;
  multiple: boolean = false;

  userName: any;
  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';
  
  rutaActual: boolean = false;

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('name');

    this.separarNombre();

    this.darkModeSubscription();

    const usuarioRol = sessionStorage.getItem('rol');

    if (usuarioRol) {
      this.navData = this.navData.filter(option => option.access.includes(usuarioRol!));
    }

  }

  toggleMode() {
      this.dark.toggleDarkMode();

      this.mode = this.dark.isDarkModeEnabled();

  }

  handleClick(item: INavbarData) {
    if(!this.multiple) {
      for(let modelItem of this.navData) {
        if(item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  separarNombre() {
    const palabras = this.userName.split(' ');

    this.nombre = palabras[0];

    if(palabras[1]) {
      this.apellidoP = palabras[1]
    }

    if(palabras[2]) {
      this.apellidoM = palabras[2]
    }
  }

  logout() {
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');

    this.router.navigate(['/login']);
  }

  private darkModeSubscription(): void {
    this.dark.darkModeChanges$().subscribe((isDarkModeEnabled: boolean) => {
      this.mode = isDarkModeEnabled;
    });
  }


}
