import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));

// new AppConfigurationClient(environment.AzureAppConfiguration)
//       .getConfigurationSetting({key: 'url:dashboardapi'}).then(x=>{

//         environment.domain = x.value!;
//         console.log(environment)
//         constant.dashboardapi = x.value!;
//         console.log(constant)

       

//       })

// url.init().then(x=>{
 
// })


