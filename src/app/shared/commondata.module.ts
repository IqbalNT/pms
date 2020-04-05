import { TruncatePipe } from "./pipes/truncate.pipe";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { CommonModule } from "@angular/common";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  declarations: [HomeComponent, TruncatePipe],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [MaterialModule, CommonModule, ReactiveFormsModule, FormsModule]
})
export class CommondataModule {}
