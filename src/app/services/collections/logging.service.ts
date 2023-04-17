import { constant } from 'src/app/common/constant';
import { CommonDataService } from 'src/app/services/dataservice/data.service';
import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoggingService {
  appInsights: ApplicationInsights;
  constructor(private commondataservice:CommonDataService) {

    this.commondataservice.getAzureAppConfiguration(constant.instrumentationKey).then((value:any)=>{
      this.appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: value,
          enableAutoRouteTracking: true // option to log all route changes
        }
      });
      this.appInsights.loadAppInsights();
    })

  }

  logPageView(name?: string, url?: string) { // option to call manually
    this.appInsights.trackPageView({
      name: name,
      uri: url
    });
  }

  logEvent(name: string, properties?: { [key: string]: any }) {
    this.appInsights.trackEvent({ name: name}, properties);
  }

  logMetric(name: string, average: number, properties?: { [key: string]: any }) {
    this.appInsights.trackMetric({ name: name, average: average }, properties);
  }

  logException(exception: Error, severityLevel?: number) {
    this.appInsights.trackException({ exception: exception, severityLevel: severityLevel });
  }

  logTrace(message: string, properties?: { [key: string]: any }) {
    this.appInsights.trackTrace({ message: message}, properties);
  }
}