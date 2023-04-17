import { constant } from 'src/app/common/constant';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { AppConfigurationClient } from '@azure/app-configuration';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  load(): Promise<any> {
    const sampleKeys = new AppConfigurationClient(environment.AzureAppConfiguration).listConfigurationSettings({
      keyFilter: "dashboardui:instrumentationKey,url:chathub,url:dashboardapi,storage:blob"
    });

    // constant.instrumentationKey = ((await (await sampleKeys.next()).value).value)
    // constant.chathub = ((await (await sampleKeys.next()).value).value)
    // constant.dashboardapi = ((await (await sampleKeys.next()).value).value)
    // constant.blob = ((await (await sampleKeys.next()).value).value)

    return new Promise((resolve, reject) => {
      sampleKeys.next().then(x => {
        constant.instrumentationKey = x.value.value;
        sampleKeys.next().then(x => {
          constant.chathub = x.value.value;
          sampleKeys.next().then(x => {
            constant.dashboardapi = x.value.value;
            sampleKeys.next().then(x => {
              constant.blob = x.value.value;
              resolve(10);
            })
          })
        })
      })
    })

    // let b = new Promise((resolve, reject) => {
    //   sampleKeys.next().then(x => {
    //     constant.chathub = x.value.value;
    //     resolve(10);
    //   })
    // })

    // let c = new Promise((resolve, reject) => {
    //   sampleKeys.next().then(x => {
    //     constant.dashboardapi = x.value.value;
    //     resolve(10);
    //   })
    // })

    // let d = new Promise((resolve, reject) => {
    //   sampleKeys.next().then(x => {
    //     constant.blob = x.value.value;
    //     resolve(10);
    //   })
    // })

    // for await (const setting of sampleKeys) {
    //   switch (setting.key.split(':')[1]){
    //     case "instrumentationKey" : constant.instrumentationKey = setting.value!; break;
    //     case "chathub" : constant.chathub = setting.value!; break;
    //     case "dashboardapi" : constant.dashboardapi = setting.value!; break;
    //     case "blob" : constant.blob = setting.value!; break;
    //   }
    // }


    // return Promise.all([a,b,c,d]).then(x=>{
    //   console.log(JSON.stringify(constant))
    // })
  }
}