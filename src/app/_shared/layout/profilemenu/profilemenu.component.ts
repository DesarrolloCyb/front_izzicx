import { LayoutService } from '@services';
import { Component } from '@angular/core';
@Component({
  selector: 'profilemenu',
  templateUrl: './profilemenu.component.html',
})
export class ProfilemenuComponent {
  constructor(public layoutService: LayoutService) {}

  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }
}
