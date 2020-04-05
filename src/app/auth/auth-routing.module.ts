import { SignupComponent } from "./signup/signup.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
// import { AuthComponent } from './auth.component';
import { CommonGuard } from "./common.guard";
import { SigninComponent } from "./signin/signin.component";
//
const routes: Routes = [
  {
    path: "",
    component: SigninComponent,
    canActivate: [CommonGuard]
  },
  {
    path: "login",
    component: SigninComponent,
    canActivate: [CommonGuard]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [CommonGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
