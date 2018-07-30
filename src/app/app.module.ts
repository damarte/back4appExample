import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AppRoutingModule } from './/app-routing.module';
import { LiveQueriesComponent } from './live-queries/live-queries.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LiveQueriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
