import { AuthService } from './../authservice/auth.service';
import { CommonDataService } from 'src/app/services/dataservice/data.service';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { LoggingService } from './logging.service';
import { Device } from '@capacitor/device';

@Injectable()
export class PushNotificationsService {

    notifications: any = [];

    constructor(private loggingservice: LoggingService, private authservice: AuthService,
        private router: Router, private commondataservice: CommonDataService) { }

    async RegisterNotification() {

        // let obj = {
        //     platform: 2,
        //     handle: "test",
        //     pushVariables : {
        //         device : await (await Device.getInfo()).model,
        //         username : await this.commondataservice.getFirstName(),
        //         email : await this.commondataservice.getEmail()
        //     },
        //     tags: [await this.commondataservice.getPartitionKey(), await this.commondataservice.getOrganization(), "all-agents"]
        // }
        // console.log(JSON.stringify(obj));

        if (Capacitor.isPluginAvailable('PushNotifications') && !(await this.commondataservice.getRegistrationId())) {
            this.loggingservice.logTrace('RegisterNotification');
            await this.CheckPermissions();
            await this.AddListeners();
            await PushNotifications.register();
        }
    }

    async UpdateNotification() {
        let id = await this.commondataservice.getRegistrationId();
        if (id) {
            let obj = {
                platform: 2,
                handle: null,
                tags: [await this.commondataservice.getPartitionKey(), await this.commondataservice.getOrganization(), "all-agents"]
            }
            this.authservice.UpdateForPushNotifications(id, obj).subscribe(res => {
                this.loggingservice.logTrace('CreatePushRegistrationId :' + res);
            });
        }
        else {
            this.RegisterNotification();
        }
    }

    async CheckPermissions() {
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }
        if (permStatus.receive !== 'granted') {
            throw new Error('User denied permissions!');
        }
    }

    async AddListeners() {

        await PushNotifications.addListener('registration', token => {
            debugger;
            this.authservice.CreatePushRegistrationId().subscribe(async (id: string) => {
                debugger;
                if (id) {
                    this.commondataservice.setRegistrationId(id);
                    this.loggingservice.logTrace('CreatePushRegistrationId :' + id);
                    let obj = {
                        platform: 2,
                        handle: token.value,
                        pushVariables : {
                            device : await (await Device.getInfo()).model,
                            username : await this.commondataservice.getFirstName(),
                            email : await this.commondataservice.getEmail()
                        },
                        tags: [await this.commondataservice.getPartitionKey(), await this.commondataservice.getOrganization(), "all-agents"]
                    }
                    this.loggingservice.logTrace(JSON.stringify(obj));
                    this.authservice.RegisterForPushNotifications(id, obj).subscribe(res => {
                        this.loggingservice.logTrace('RegisterForPushNotifications :' + res);
                    });
                }
            });
        });

        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            this.loggingservice.logTrace('pushNotificationActionPerformed :' + JSON.stringify(notification));
            this.notifications.push(notification);
            this.router.navigate(["dashboard/live-chats"]);
        });

        await PushNotifications.addListener('registrationError', err => {
            // err.error
        });

        await PushNotifications.addListener('pushNotificationReceived', notification => {
            this.notifications.push(notification);
        });
    }

    getDeliveredNotifications = async () => {
        const notificationList = await PushNotifications.getDeliveredNotifications();
    }

    removeNotifs = async () => {
        const notifs = await PushNotifications.getDeliveredNotifications();
        const result = await PushNotifications.removeDeliveredNotifications(notifs);
    }

    removeAllNotifs = async () => {
        const result = await PushNotifications.removeAllDeliveredNotifications();
    }

}





    //additonal

    // this.commondataservice.getRegistrationId().then((id) => {
    //     if (!id) {
    //         this.init();
    //     }
    // }, (er) => {
    //     console.log(er)
    // })

    // this.loggingservice.logTrace('Push notification action performed - actionId: ' + notification.actionId + ' inputValue:' + notification.inputValue);

    // init() {
    //     if (Capacitor.isPluginAvailable('PushNotifications')) {
    //         this.loggingservice.logTrace('PushNotifications');
    //         this.registerNotifications();
    //         this.addListeners();
    //     }

    //     if (Capacitor.getPlatform() === "ios") {

    //     } else if (Capacitor.getPlatform() === "android") {

    //     }
    //     else if (Capacitor.getPlatform() === "web") {

    //     }

    //     if (Capacitor.isNativePlatform()) {
    //         // Platform is mobile
    //     } else {
    //         // Platform is not mobile
    //     }

    // }

    // registerNotifications = async () => {
    //     let permStatus = await PushNotifications.checkPermissions();

    //     if (permStatus.receive === 'prompt') {
    //         permStatus = await PushNotifications.requestPermissions();
    //     }

    //     if (permStatus.receive !== 'granted') {
    //         throw new Error('User denied permissions!');
    //     }

    //     await PushNotifications.register();
    //     this.loggingservice.logTrace('registered');

    // }

    //#region fcm
    // FCM.subscribeTo({ topic: "test" })
    // .then((r) => alert(`subscribed to topic`))
    // .catch((err) => console.log(err));

    // Unsubscribe from a specific topic
    // FCM.unsubscribeFrom({ topic: "test" })
    //   .then(() => alert(`unsubscribed from topic`))
    //   .catch((err) => console.log(err));

    // Get FCM token instead the APN one returned by Capacitor
    // FCM.getToken()
    //   .then((r) => alert(`Token ${r.token}`))
    //   .catch((err) => console.log(err));

    // Remove FCM instance
    // FCM.deleteInstance()
    //   .then(() => alert(`Token deleted`))
    //   .catch((err) => console.log(err));

    // Enable the auto initialization of the library
    // FCM.setAutoInit({ enabled: true }).then(() => alert(`Auto init enabled`));

    // // Check the auto initialization status
    // FCM.isAutoInitEnabled().then((r) => {
    //   console.log("Auto init is " + (r.enabled ? "enabled" : "disabled"));
    // });


    // this.removeNotifs();

    // this.removeAllNotifs();

    //#endregion
