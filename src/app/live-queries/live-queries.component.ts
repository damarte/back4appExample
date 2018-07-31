import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { Parse } from 'parse';

@Component({
  selector: 'app-live-queries',
  templateUrl: './live-queries.component.html',
  styleUrls: ['./live-queries.component.css']
})
export class LiveQueriesComponent implements OnInit, OnDestroy {

  messages = [];
  subscription = null;

  constructor() { }

  ngOnInit() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
    Parse.masterKey = environment.PARSE_MASTER_KEY;

    const Message = Parse.Object.extend('Message');
    let query = new Parse.Query(Message);
    query.descending('createdAt');
    const context = this;
    query.find({
      success: function(results) {
        context.messages = results;
      },
      error: function(error) {
        console.error(error);
      }
    });

    const client = new Parse.LiveQueryClient({
      applicationId: environment.PARSE_APP_ID,
      serverURL: environment.liveQueriesServerURL, // Example: 'wss://livequerytutorial.back4app.io'
      javascriptKey: environment.PARSE_JS_KEY,
      masterKey: environment.PARSE_MASTER_KEY
    });
    client.open();

    query = new Parse.Query('Message');
    query.descending('createdAt');
    this.subscription = client.subscribe(query);

    this.subscription.on('open', () => {
      console.log('subscription opened');
    });

    this.subscription.on('create', (object) => {
      console.log('object created: ' + object.get('data'));
      context.messages.unshift(object);
    });

    this.subscription.on('update', (object) => {
      console.log('object updated: ' + object.get('data'));
      const index = context.messages.findIndex(message => message.id === object.id);
      context.messages.splice(index, 1, object);
    });

    this.subscription.on('delete', (object) => {
      console.log('object deleted: ' + object.get('data'));
      context.messages = this.messages.filter(message => message.id !== object.id);
    });

    this.subscription.on('enter', (object) => {
      console.log('object entered: ' + object.get('data'));
    });

    this.subscription.on('leave', (object) => {
      console.log('object left: ' + object.get('data'));
    });

    this.subscription.on('close', () => {
      console.log('subscription closed');
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    Parse.LiveQuery.close();
  }

  createMessage() {
    const Message = Parse.Object.extend('Message');
    const newMessage = new Message();
    newMessage.set('data', 'Prueba ' + new Date().getTime());

    newMessage.save(null, {
      success: function(message) {
        console.log('Message created successfully with data: ' + message.get('data'));
      },

      error: function(error) {
        console.error('Error ' + error.code + ': ' + error.message);
      }
    });
  }

  purgeMessages() {
    const schema = new Parse.Schema('Message');
    const context = this;
    schema.purge({
      success: function() {
        console.log('Messages purged');
        context.messages = [];
      },

      error: function(error) {
        console.error('Error ' + error.code + ': ' + error.message);
      }
    });
  }

}
