import { AuthState } from "./auth/state/auth.state";
import { NgxsModule } from "@ngxs/store";
import { CommonGuard } from "./auth/common.guard";
import { AuthGuard } from "./auth/auth.guard";
import { CommonService } from "./shared/services/common.service";
import { NavService } from "./shared/services/nav.service";
import { LoaderService } from "./shared/services/loader.service";
import { environment } from "./../environments/environment.prod";
import { ApiInterceptor } from "./shared/helper/api.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { CommondataModule } from "./shared/commondata.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { SideBarComponent } from "./shared/components/side-bar/side-bar.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

@NgModule({
  declarations: [AppComponent, NavBarComponent, SideBarComponent],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    BrowserAnimationsModule,
    CommondataModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [AppRoutingModule],
  providers: [
    LoaderService,
    NavService,
    AuthGuard,
    CommonGuard,
    CommonService,
    { provide: "BASE_API_URL", useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
