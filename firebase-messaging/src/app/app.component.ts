import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from './message.model';
import { MessagingService } from './service/messaging.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'firebase-messaging';
  notifications: { title: string, body: string }[] = [];
  message;
  token;

  listMsg: Message[] = [];
  count: number = 0;
  hide: boolean = true;

  subscription: Subscription = new Subscription;
  constructor(private messagingService: MessagingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

    this.messagingService.fetchMessage().subscribe(messages => {
      this.listMsg = messages;
      this.count = this.listMsg.filter(mgs => mgs.seen === false).length;
    });

    this.subscription = this.messagingService.listMessageChanged.subscribe(() => {
      this.messagingService.fetchMessage().subscribe(messages => {
        console.log('update list');
        this.listMsg = messages;
        this.count = this.listMsg.filter(mgs => mgs.seen === false).length;
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onGetToken() {
    this.messagingService.getTokenFCM().subscribe(token => {
      this.token = token;
    });
  }

  onRead(notifyCode: string, id: string) {
    const ids: string[] = [id];
    this.messagingService.readMessage(notifyCode, ids);
  }

  onReadAll(listMsg: Message[]) {
    let ids: string[] = [];
    listMsg.forEach(msg => {
      ids.push(msg.id)
    });
    this.messagingService.readMessage(listMsg[0].notifyCode, ids);
  }

  onRemove(notifyCode: string, id: string) {
    const ids: string[] = [id];
    this.messagingService.removeMessage(notifyCode, ids);
  }

  onRemoveAll(listMsg: Message[]) {
    let ids: string[] = [];
    listMsg.forEach(msg => {
      ids.push(msg.id)
    });
    this.messagingService.removeMessage(listMsg[0].notifyCode, ids);
  }

  show() {
    this.hide = !this.hide;
  }

  addItem() {
    window.location.reload();
  }

 
}
