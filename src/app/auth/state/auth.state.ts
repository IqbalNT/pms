import { Auth } from "../models/auth.model";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { Login, Logout } from "../actions/auth.action";
import { Navigations } from "../models/navigations.model";
import { UserInfo } from "src/app/shared/models/user-info.model";

export class AuthStateModel {
  auth: Auth;
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    auth: {
      isAuthenticated: null,
      userInformation: null
    }
  }
})
export class AuthState {
  @Selector()
  static isLoggedIn(state: AuthStateModel): boolean {
    return state.auth.isAuthenticated;
  }

  // @Selector()
  // static menuList(state: AuthStateModel): Array<Navigations> {
  //   return state.auth.userInformation.navigations;
  // }

  @Selector()
  static userInfo(state: AuthStateModel): Auth {
    return state.auth;
  }

  // @Selector()
  // static username(state: AuthStateModel): string {
  //   return state.auth.userInformation.userName;
  // }

  // @Selector()
  // static fullname(state: AuthStateModel): string {
  //   return state.auth.userInformation.name;
  // }

  // @Selector()
  // static avatar(state: AuthStateModel): string {
  //   return state.auth.userInformation.pictureName;
  // }

  @Selector()
  static getAuthInfo(state: AuthStateModel): Auth {
    return state.auth;
  }

  // @Selector()
  // static getAccessToken(state: AuthStateModel): string {
  //   return state.auth.userInformation.accessToken;
  // }

  @Action(Login)
  login({ setState }: StateContext<AuthStateModel>, { payload }: Login) {
    setState({ auth: payload });
  }

  @Action(Logout)
  logout({ setState }: StateContext<AuthStateModel>, {}: Logout) {
    setState({
      auth: {
        isAuthenticated: false,
        userInformation: null
      }
    });
  }
}
