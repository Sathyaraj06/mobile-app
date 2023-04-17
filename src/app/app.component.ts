import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from './services/collections/push-notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Evis';

  constructor(private pushnotificationservice:PushNotificationsService){
    console.log(JSON.stringify(environment))
  }

  ngOnInit() {
    this.pushnotificationservice.RegisterNotification();
    // this.pushnotificationservice.UpdateNotification();
}

}
