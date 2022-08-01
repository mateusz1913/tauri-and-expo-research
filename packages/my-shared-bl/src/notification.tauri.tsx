import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

import type { NotificationModuleInterface, StaticImplements } from './types';

export class NotificationModule implements StaticImplements<NotificationModuleInterface, typeof NotificationModule> {
  static async sendNotification(title: string, body?: string) {
    if (!await isPermissionGranted()) {
      const permissionResult = await requestPermission();

      if (permissionResult !== 'granted') {
        return;
      }
    }

    sendNotification({ body, title });
  }
}
