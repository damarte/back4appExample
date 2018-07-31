import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Parse } from 'parse';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }

  createUser() {
    const newUser = new Parse.User();
    newUser.set('username', 'dmartinez');
    newUser.set('email', 'dmartinez@jig.es');
    newUser.set('password', 'prueba');
    newUser.set('rememberMe', true);

    newUser.signUp(null).then(
        function(user) {
            alert('User created successfully with email: ' + user.get('email'));
        },

        function(error) {
            alert('Error ' + error.code + ': ' + error.message);
        }
    );
  }

  uploadFile() {
    const base64 = 'V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=';
    const file = new Parse.File('myfile.txt', { base64: base64 });

    file.save().then(function() {
      // The file has been saved to Parse.
      alert('The file has been saved to Parse');
    }, function(error) {
      // The file either could not be read, or could not be saved to Parse.
      alert('Error ' + error.code + ': ' + error.message);
    });
  }

  ngOnInit() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

}
