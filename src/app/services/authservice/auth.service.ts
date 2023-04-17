
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../../environments/environment.prod';
import { url } from 'src/app/common/api-mapping';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { CommonDataService } from '../dataservice/data.service';
import { LoggingService } from '../collections/logging.service';
import { filter, take } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';


@Injectable()
export class AuthService {

  isLoggedOut: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private commondataservice: CommonDataService, private router: Router,
    private loggingservice: LoggingService) {
  }


  // if (Capacitor.isNativePlatform()) {
  //   await this.UnregisterFromNotifications();
  // }

  //#region push-notication

  CreatePushRegistrationId() {
    return this.http.get(url.CreatePushRegistrationId).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((res: any) => {
        return of(res?.error);
      }));
  }

  async UnregisterFromNotifications() {
    return this.http.delete(url.UnregisterFromNotifications + '/' + await this.commondataservice.getRegistrationId()).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((res: any) => {
        return of(res?.error);
      })).subscribe(res => {
        this.loggingservice.logTrace('UnregisterFromNotifications: ' + res);
      });
  }

  RegisterForPushNotifications(registrationId: any, obj: any) {
    return this.http.put(url.RegisterForPushNotifications + '/' + registrationId, obj).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((res: any) => {
        return of(res?.error);
      }));
  }

  UpdateForPushNotifications(registrationId: any, obj: any) {
    return this.http.put(url.UpdateForPushNotifications + '/' + registrationId, obj).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((res: any) => {
        return of(res?.error);
      }));
  }

  //#endregion

}
