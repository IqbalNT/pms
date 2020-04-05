import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./shared/components/home/home.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: "./auth/auth.module#AuthModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
