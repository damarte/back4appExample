import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public authenticationService: AuthenticationService,
              private router: Router) {
  }

  signOut() {
    const context = this;
    this.authenticationService.logOut().then(
      () => context.router.navigate(['/login'])
    ).catch(
      error => console.error(error)
    );
  }
}
