import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BracketComponent } from './bracket/bracket.component';
import { RecapComponent } from './recap/recap.component';

@NgModule({
  declarations: [
    AppComponent,
    BracketComponent,
    RecapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
