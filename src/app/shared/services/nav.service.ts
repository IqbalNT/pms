import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class NavService {
  public appDrawer: any;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // this.closeNav();
    });
  }

  // public closeNav() {
  //   this.appDrawer.close();
  // }

  public openNav() {
    this.appDrawer.open();
  }
  public toggleSidenav() {
    // this.appDrawer.opened ? this.closeNav() : this.openNav();
  }
}
