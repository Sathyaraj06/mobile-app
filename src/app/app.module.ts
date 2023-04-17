import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CryptoJsService } from './services/collections/crypto.service';
import { CommonDataService } from './services/dataservice/data.service';
import { AuthService } from './services/authservice/auth.service';
import { LoggingService } from './services/collections/logging.service';


const googleLoginOptions = {
  oneTapEnabled: false,
  scope: 'profile email openid',
  plugin_name: 'sample_login'
};

const microsoftLoginOptions = {
  scopes: ['User.Read', 'Mail.Read']
};

// export function EnvironmentInit(environmentservice: EnvironmentService) {
//   return new Promise(function(resolve, reject) {
//     resolve(environmentservice.load())
//   });
// };


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (environmentservice: EnvironmentService) => {
    //     return () => environmentservice.load()
    //   },
    //   multi: true,
    //   deps: [EnvironmentService]
    // },
    CryptoJsService,
    CommonDataService,
    AuthService,

    LoggingService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
