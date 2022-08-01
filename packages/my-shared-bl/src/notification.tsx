import * as Notifications from 'expo-notifications';

import type { NotificationModuleInterface, StaticImplements } from './types';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    priority: Notifications.AndroidNotificationPriority.HIGH,
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export class NotificationModule implements StaticImplements<NotificationModuleInterface, typeof NotificationModule> {
  static async sendNotification(title: string, body?: string) {
    const permissionsStatus = await Notifications.getPermissionsAsync();

    if (
      !permissionsStatus.granted &&
      permissionsStatus.ios?.status !== Notifications.IosAuthorizationStatus.PROVISIONAL &&
      permissionsStatus.ios?.status !== Notifications.IosAuthorizationStatus.AUTHORIZED
    ) {
      const permissionResult = await Notifications.requestPermissionsAsync();

      if (
        !permissionResult.granted &&
        permissionResult.ios?.status !== Notifications.IosAuthorizationStatus.PROVISIONAL &&
        permissionResult.ios?.status !== Notifications.IosAuthorizationStatus.AUTHORIZED
      ) {
        return;
      }
    }

    Notifications.scheduleNotificationAsync({
      content: { body, title },
      trigger: {
        seconds: 5,
      },
    });
  }
}
