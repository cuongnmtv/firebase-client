import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: any) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log('token client: ' + token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
        //this.showCustomNotification(payload);
      })
  }
  getTokenFCM() {
    return this.angularFireMessaging.getToken;
  }
  /*
  showCustomNotification(payload: any) {
    let notify_data = payload['notification'];
    let title = notify_data['title'];
    let options = {
      body: notify_data['body'],
      icon: "./assets/images/badge.jpg",
      badge: "./assets/images/badge.jpg",
      //image: "./assets/images/badge.jpg",
    };
    console.log("new message received: " + notify_data);
    let notify: Notification = new Notification(title, options);

    notify.onclick = event => {
      event.preventDefault();
      window.open('https://www.google.com','_blank');
    }
  }
  */
}