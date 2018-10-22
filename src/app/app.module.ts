import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatCardModule,
  MatIconModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BoxAndWhiskersComponent } from "./box-and-whiskers/box-and-whiskers.component";

@NgModule({
  declarations: [AppComponent, BoxAndWhiskersComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
