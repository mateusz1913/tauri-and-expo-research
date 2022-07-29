import { platform, type } from '@tauri-apps/api/os';

import type { PlatformModuleInterface, StaticImplements } from './types';

export class PlatformModule implements StaticImplements<PlatformModuleInterface, typeof PlatformModule> {
  static async getPlatform() {
    const platformType = await platform();
    const osType = await type();

    console.log('TAURI');

    if (osType === 'Darwin') {
      return Promise.resolve({ platform: platformType, os: 'macos' as const });
    }

    if (osType === 'Linux') {
      return Promise.resolve({ platform: platformType, os: 'linux' as const });
    }

    return Promise.resolve({ platform: platformType, os: 'windows' as const });
  }
}
