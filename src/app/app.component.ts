import {
  Component,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectorRef
} from "@angular/core";
import { VERSION } from "@angular/platform-browser-dynamic";
import { NavService } from "./shared/services/nav.service";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { Navigations } from "./auth/models/navigations.model";
import { Observable, Subscription } from "rxjs";
import { CommonService } from "./shared/services/common.service";
import { UIInfo } from "./shared/models/ui-info.model";
import { LoaderService } from "./shared/services/loader.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild("appDrawer") appDrawer: ElementRef;
  uiInfo: UIInfo;
  version = VERSION;
  cardTitle: string;
  navItems: Navigations[] = [];
  isLoading: boolean;
  uiInfoSub: Subscription;
  loadSub: Subscription;
  authSub: Subscription;
  constructor(
    private navService: NavService,
    private route: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private changeDetectorRef: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {
    if (!this.authService.isLoggedIn) {
      this.route.navigate(["/auth"]);
    }
  }

  ngOnInit() {
    this.authSub = this.authService.userInfo.subscribe(info => {
      if (info.isAuthenticated && info.userInformation) {
        this.route.navigate(["/"]);
      }
    });
    // this.uiInfoSub = this.commonService.uiInfo.subscribe(uiInfo => {
    //   this.uiInfo = uiInfo;
    //   this.cardTitle = uiInfo.title;
    //   this.changeDetectorRef.detectChanges();
    // });
    this.loadSub = this.loaderService.isLoading.subscribe(loading => {
      this.isLoading = loading;
      this.changeDetectorRef.detectChanges();
    });
  }
  get isLoggedIn$() {
    // this.authService.isLoggedIn.subscribe(data => {
    //   console.log(data);
    // });

    return this.authService.isLoggedIn;
  }

  get loadingStatus$() {
    return this.isLoading;
  }

  // get menuList$() {
  //   return this.authService.menuList;
  // }

  ngAfterViewInit() {
    // this.navService.appDrawer = this.appDrawer;
  }

  onClickAuthorization() {
    // this.authorizationValue = StatusEnumFromFronend.Active;
    // this.declinedValue = StatusEnumFromFronend.Empty;
  }
  onClickDeclined() {
    // this.authorizationValue = StatusEnumFromFronend.Empty;
    // this.declinedValue = StatusEnumFromFronend.Declined;
  }

  ngOnDestroy() {
    if (this.uiInfoSub) {
      this.uiInfoSub.unsubscribe();
    }
    if (this.loadSub) {
      this.loadSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
