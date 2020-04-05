import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatInput } from "@angular/material";
import { AuthService } from "../auth.service";
import { AuthInterface } from "../..//interface/auth.interface";
import { Store } from "@ngxs/store";
import { Login } from "../actions/auth.action";
import { Router } from "@angular/router";
import { CommonService } from "../../shared/services/common.service";
import { Observable, Subscription } from "rxjs";
import { LoaderService } from "src/app/shared/services/loader.service";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit, OnDestroy {
  status = false;
  // classNameWithoutKeyboard = "visibility-true";
  // classNameWithKeyboard = "visibility-false";
  passwordValue = "";
  userNamevalue = "";
  // keyboardIcon = "keyboard";
  eyeIcon = "visibility";
  eyeStatus = false;
  auth: AuthInterface;
  isLoading$: Observable<boolean>;
  isLoggedIn: boolean = null;
  authSub: Subscription;
  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store,
    private loaderService: LoaderService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.commonService.setUiInfo({
      title: "Authentication"
    });
    this.isLoading$ = this.loaderService.isLoadingState();
  }

  loginRequest() {
    this.loaderService.isLoading.next(true);
    this.auth = {
      password: this.passwordValue,
      userName: this.userNamevalue
    };
    this.authSub = this.authService.auth(this.auth).subscribe(data => {
      if (data && data.isAuthenticated) {
        // localStorage.setItem('accessToken', data.userInformation.accessToken); //iqbal

        // console.log("paisi...........", data.userInformation.accessToken);
        // this.commonService.setAccessToken(data.userInformation.accessToken);
        this.isLoggedIn = true;

        this.store.dispatch(new Login(data));
        this.loaderService.isLoading.next(false);
        this.router.navigate(["/"]);
      } else {
        this.isLoggedIn = false;
        this.commonService.showErrorMsg(
          "Invalid username or password. Try again!"
        );
        this.loaderService.isLoading.next(false);
        return;
      }
    });
  }

  // hiddenKeyboard(event: MatInput) {
  //   this.classNameWithoutKeyboard = this.status
  //     ? "visibility-true"
  //     : "visibility-false";
  //   this.classNameWithKeyboard = this.status
  //     ? "visibility-false"
  //     : "visibility-true";
  //   this.status = !this.status;
  //   this.keyboardIcon = this.status ? "keyboard_hide" : "keyboard";
  //   event.focus();
  // }

  showPassword(firstEvent: MatInput, secondEvent: MatInput) {
    firstEvent.type = !this.eyeStatus ? "text" : "password";
    secondEvent.type = !this.eyeStatus ? "text" : "password";
    this.eyeIcon = this.eyeStatus ? "visibility" : "visibility_off";
    this.eyeStatus = !this.eyeStatus;
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
