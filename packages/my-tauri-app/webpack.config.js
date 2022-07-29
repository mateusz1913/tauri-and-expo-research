const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const node_modules = path.join(__dirname, 'node_modules');

const sharedBLPak = require('../my-shared-bl/package.json');
const sharedUIPak = require('../my-shared-ui/package.json');

const sharedBLPath = path.resolve(__dirname, '..', 'my-shared-bl');
const sharedUIPath = path.resolve(__dirname, '..', 'my-shared-ui');

const modules = Object.keys({
  ...sharedBLPak.peerDependencies,
  ...sharedUIPak.peerDependencies,
});

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.resolve.extensions = [ '.tauri.tsx', '.web.tsx', '.tsx', '.tauri.ts', '.web.ts', '.ts', 'tauri.js', '.web.js', '.js', '.json', '...' ];
  // Handle shared-ui
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    include: [ sharedBLPath, sharedUIPath ],
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          'babel-preset-expo',
        ],
      },
    },
  });
  // config.module.rules.push({
  //   test: /\.(js|jsx|ts|tsx)$/,
  //   include: path.resolve(root, 'src'),
  //   use: {
  //     loader: 'babel-loader',
  //     options: {
  //       plugins: [ 'react-native-reanimated/plugin' ],
  //     },
  //   },
  // });

  // We need to make sure that only one version is loaded for peerDependencies
  // So we alias them to the versions in example's node_modules
  Object.assign(config.resolve.alias, {
    ...modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
    '@tauri-and-expo/shared-bl': sharedBLPath,
    '@tauri-and-expo/shared-ui': sharedUIPath,
    'react': path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
  });

  return config;
};
