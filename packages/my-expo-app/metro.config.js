const path = require('path');

const { getDefaultConfig } = require('@expo/metro-config');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const defaultConfig = getDefaultConfig(__dirname);

const sharedBLPak = require('../my-shared-bl/package.json');
const sharedUIPak = require('../my-shared-ui/package.json');

const sharedBLPath = path.resolve(__dirname, '..', 'my-shared-bl');
const sharedUIPath = path.resolve(__dirname, '..', 'my-shared-ui');

const modules = Object.keys({
  ...sharedBLPak.peerDependencies,
  ...sharedUIPak.peerDependencies,
});

const blockList = exclusionList(
  modules.map(
    (m) =>
      new RegExp(`^(${escape(path.join(sharedBLPath, 'node_modules', m))})|(${escape(path.join(sharedUIPath, 'node_modules', m))})\\/.*$`)
  )
);
const extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);
  return acc;
}, {
  '@tauri-and-expo/shared-bl': sharedBLPath,
});

module.exports = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [ sharedBLPath, sharedUIPath ],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the shared-expo-bl & shared-ui, and alias them to the versions in example's node_modules
  resolver: {
    ...defaultConfig.resolver,

    blockList,
    extraNodeModules,
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
