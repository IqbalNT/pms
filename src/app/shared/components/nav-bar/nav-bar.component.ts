import { Auth } from "./../../../auth/models/auth.model";
import { Subscription } from "rxjs";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean> = of(false);
  isLoading: boolean;
  userInfo: Auth;
  authSub: Subscription;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    // this.uiInfoSub = this.commonService.uiInfo.subscribe(uiInfo => {
    //   this.uiInfo = uiInfo;
    //   this.changeDetectorRef.detectChanges();
    // });

    this.authSub = this.authService.userInfo.subscribe(authInfo => {
      this.userInfo = authInfo;
      this.changeDetectorRef.detectChanges();
    });

    // this.asyncSub = this.asyncService.isLoading.subscribe(loading => {
    //   this.isLoading = loading;
    //   this.changeDetectorRef.detectChanges();
    // });

    // this.asyncService.finish(); // close aborted loading
  }

  onLogOut(): void {
    this.authService.logout();
    // this.appDrawer.close(); // closing sidenav
    this.router.navigate(["/auth"]);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
}
