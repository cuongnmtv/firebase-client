import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { MessagingService } from "./service/messaging.service";
import { environment } from "../environments/environment";
import { AsyncPipe } from "../../node_modules/@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

@NgModule({
   declarations: [AppComponent],
   imports: [
      //AppRoutingModule,
      BrowserModule,
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      AngularFireMessagingModule,
      HttpClientModule,
      AngularFireModule.initializeApp(environment.firebase),
      RouterModule.forRoot(
         [
           { path: "", component: AppComponent}
         ]
       )
   ],
   providers: [MessagingService,AsyncPipe],
   bootstrap: [AppComponent]
})
export class AppModule { }