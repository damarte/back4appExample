import { Injectable } from '@angular/core';
import { LoginObject } from '../models/login-object.model';
import { environment } from '../../environments/environment';
import { Parse } from 'parse';

@Injectable()
export class AuthenticationService {

  isAuthenticated = false;

  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;

    this.isAuthenticated = this.authenticated();
  }

  login(loginObj: LoginObject): Parse.Promise {
    const promise = Parse.User.logIn(loginObj.username, loginObj.password);
    promise.then(user => this.isAuthenticated = this.authenticated());
    return promise;
  }

  logOut(): Parse.Promise {
    const promise = Parse.User.logOut();
    promise.then(() => this.isAuthenticated = this.authenticated());
    return promise;
  }

  currentUser(): Parse.User {
    console.log(Parse.User.current());
    return Parse.User.current();
  }

  private authenticated(): boolean {
    return Parse.User.current() !== null;
  }
}
