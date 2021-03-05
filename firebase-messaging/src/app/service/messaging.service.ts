import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subject } from 'rxjs'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Message } from '../message.model';

@Injectable()
export class MessagingService {

  listMessageChanged = new Subject<void>();
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
    this.angularFireMessaging.messages.subscribe(
      (_messaging: any) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  fetchMessage() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('notifyCode', '4b7dcb1c-fdf1-435c-8911-5914573770ed');
    searchParams = searchParams.append('userId', 'cuongnmtv');
    return this.http.get<Message[]>(
      'http://localhost:8085/api/notification-service/message/fetch',
      {
        params: searchParams
      }
    );
  }

  readMessage(notifyCode: string, ids: string[]) {
    const data = {
      notifyCode: notifyCode,
      ids: ids
    }
    const headers = { 
    };

    this.http.post<{status: number, message: string, response: string}>(
      'http://localhost:8085/api/notification-service/message/read',
      data,
      {
        headers: headers
      }
    ).subscribe(() => {
      this.listMessageChanged.next();
    });
  }

  removeMessage(notifyCode: string, ids: string[]) {
    const data = {
      notifyCode: notifyCode,
      ids: ids
    }
    const headers = { 
    };

    this.http.post<{status: number, message: string, response: string}>(
      'http://localhost:8085/api/notification-service/message/remove',
      data,
      {
        headers: headers
      }
    ).subscribe(() => {
      this.listMessageChanged.next();
    });
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
        this.listMessageChanged.next();
        this.showCustomNotification(payload);
      })
  }
  getTokenFCM() {
    return this.angularFireMessaging.getToken;
  }
  
  showCustomNotification(payload: any) {
    let notify_data = payload['data'];
    let title = notify_data['title'];
    let callbackUrl = notify_data['callbackUrl'];
    let options = {
      body: notify_data['body'],
      icon: notify_data['logo'],
      //badge: "./assets/images/badge.jpg",
      //image: "./assets/images/badge.jpg",
    };
    console.log("new message received: " + notify_data);
    let notify: Notification = new Notification(title, options);

    notify.onclick = event => {
      event.preventDefault();
      window.open(callbackUrl);
    }
  }
  
}