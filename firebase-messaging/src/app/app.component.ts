import { Component } from '@angular/core';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-messaging';
  notifications: { title: string, body: string }[] = [];
  message;
  token;
  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  onGetToken() {
    this.messagingService.getTokenFCM().subscribe(token => {
      this.token = token;
    });
  }
}
