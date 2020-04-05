import { Auth } from "./models/auth.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { AuthInterface } from "../interface/auth.interface";
import { AuthState } from "./state/auth.state";
import { Select, Store } from "@ngxs/store";
import { map, catchError } from "rxjs/operators";
import { IContainer } from "../interface/api-container.interface";
import { Logout } from "./actions/auth.action";
import { Router } from "@angular/router";
import { Navigations } from "./models/navigations.model";
import { UserInfo } from "../shared/models/user-info.model";
import { LoaderService } from "../shared/services/loader.service";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  @Select(AuthState.isLoggedIn) isLoggedIn: Observable<boolean>;
  // @Select(AuthState.menuList) menuList: Observable<Array<Navigations>>;
  @Select(AuthState.userInfo) userInfo: Observable<Auth>;
  // @Select(AuthState.username) username: Observable<string>;
  // @Select(AuthState.fullname) fullname: Observable<string>;
  // @Select(AuthState.avatar) avatar: Observable<string>;
  // @Select(AuthState.getAccessToken) getAccessToken: Observable<string>;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  public auth(data: AuthInterface): Observable<any> {
    return this.http
      .post<IContainer<AuthInterface>>("/user/signin", {
        userName: data.userName,
        password: data.password
      })
      .pipe(
        map(response =>
          response.isExecuted && response.data ? response.data : null
        ),
        catchError(error => of(null))
      );
  }

  public logout() {
    this.loaderService.isLoading.next(true);
    // localStorage.removeItem("accessToken"); //iqbal
    this.store.dispatch(new Logout());
    this.loaderService.isLoading.next(false);
    this.router.navigate(["/auth"]);
  }
}
