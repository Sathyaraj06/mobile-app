
import { environment } from 'src/environments/environment';

// let domain:string;

let map = (action: string) => `${environment.api}${action}`;

export const url = {

  //#region Blob Json
  CreatePushRegistrationId: map('/api/notifications/CreatePushRegistrationId'),
  UnregisterFromNotifications: map('/api/notifications/UnregisterFromNotifications'),
  RegisterForPushNotifications: map('/api/notifications/RegisterForPushNotifications'),
  UpdateForPushNotifications: map('/api/notifications/UpdateForPushNotifications'),
  SendNotification: map('/api/notifications/SendNotification'),
  //#endregion


}
