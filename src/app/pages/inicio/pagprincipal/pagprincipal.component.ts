import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pagprincipal',
  templateUrl: './pagprincipal.component.html',
  styleUrls: ['./pagprincipal.component.scss']
})
export class PagprincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToProjects1() {
    this.router.navigate(['/login-Izzi']);
  }
  navigateToProjects2() {
    this.router.navigate(['/login-Mariana']);
  }

}
