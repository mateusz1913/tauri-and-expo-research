const path = require('path');

const { getDefaultConfig } = require('@expo/metro-config');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const defaultConfig = getDefaultConfig(__dirname);

const sharedPak = require('../my-shared-ui/package.json');

const shared = path.resolve(__dirname, '..', 'my-shared-ui');

const modules = Object.keys({
  ...sharedPak.peerDependencies,
});

const blockList = exclusionList(
  modules.map(
    (m) =>
      new RegExp(`^${escape(path.join(shared, 'node_modules', m))}\\/.*$`)
  )
);
const extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);
  return acc;
}, {});

module.exports = {
  ...defaultConfig,

  projectRoot: __dirname,
  watchFolders: [ shared ],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the shared-ui, and alias them to the versions in example's node_modules
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
