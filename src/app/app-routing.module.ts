import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestComponent } from './test/test.component';
import { LiveQueriesComponent } from './live-queries/live-queries.component';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent, canActivate: [ AuthorizatedGuard ] },
  { path: 'live-queries', component: LiveQueriesComponent, canActivate: [ AuthorizatedGuard ] },
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: '**', redirectTo: '/test'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true, enableTracing: !environment.production }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
