import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { BehaviorSubject, of, Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { AppConfigurationClient } from '@azure/app-configuration';


@Injectable()
export class CommonDataService {

    settings: any = { instrumentationKey: '', chathub: '', dashboardapi: '', blob: '' };
    profile: BehaviorSubject<any> = new BehaviorSubject<any>({});
    notifications: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor() {
    }

    logoutSession(){
        this.profile.next({});
    }

    async getAzureAppConfiguration(key:string){
        const client = new AppConfigurationClient(environment.AzureAppConfiguration);
        return (await client.getConfigurationSetting({key: key })).value || "";
    }

    get isMobile() {
        return window.screen.width < 800;
    }

    setRegistrationId(id: string) {
        Storage.set({ key: 'registrationId', value: id });
    }

    async getRegistrationId() {
        return Storage.get({ key: 'registrationId' }).then(x => {
            return x.value;
        })
    }

    async setHandleToken(token: string) {
        Storage.set({ key: 'handleToken', value: token });
    }

    async getHandleToken() {
        return await (await Storage.get({ key: 'handleToken' })).value || "";
    }

    async setProfile(data: any) {
        Storage.set({ key: 'profile', value: JSON.stringify(data) });
    }

    getProfile() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value) || {};
        });
    }

    setBearerToken(token: string) {
        Storage.set({ key: 'token', value: token });
    }

    getBearerToken() {
        return Storage.get({ key: 'token' }).then((x: any) => {
            return x.value || '';
        });
    }

    get isAdmin() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value)?.isAdmin || false;
        });
    }

    getPartitionKey() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value)?.partitionKey || 'test-partition-key';
        });
    }

    getOrganization() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value)?.organization || 'test-organization';
        });
    }

    getOrganizationId() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value)?.organizationId || 'test-organizationid';
        });
    }

    getEmail() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value)?.email || 'test-email';
        });
    }

    getFirstName() {
        return Storage.get({ key: 'profile' }).then((x: any) => {
            return JSON.parse(x.value)?.firstName || 'test-name';
        });
    }


}
