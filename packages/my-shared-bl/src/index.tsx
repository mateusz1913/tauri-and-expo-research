import { Platform } from 'react-native';

import type { PlatformModuleInterface, StaticImplements } from './types';

export class PlatformModule implements StaticImplements<PlatformModuleInterface, typeof PlatformModule> {
  static async getPlatform() {
    const platformOS = Platform.OS;

    console.log('WEB');

    if (platformOS === 'macos') {
      return Promise.resolve({ platform: 'darwin' as const, os: platformOS });
    }

    if (platformOS === 'windows') {
      return Promise.resolve({ platform: 'win32' as const, os: platformOS });
    }

    return Promise.resolve({ platform: platformOS, os: platformOS });
  }
}
