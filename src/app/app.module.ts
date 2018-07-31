import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AppRoutingModule } from './app-routing.module';
import { LiveQueriesComponent } from './live-queries/live-queries.component';
import { LoginComponent } from './login/login.component';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LiveQueriesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthorizatedGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
