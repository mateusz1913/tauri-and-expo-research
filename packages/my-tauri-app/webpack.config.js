const path = require('path');

const createExpoWebpackConfigAsync = require('@expo/webpack-config');

const node_modules = path.join(__dirname, 'node_modules');

const sharedPak = require('../my-shared-ui/package.json');

const shared = path.resolve(__dirname, '..', 'my-shared-ui');

const modules = Object.keys({
  ...sharedPak.peerDependencies,
});

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Handle shared-ui
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    include: shared,
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
    '@tauri-and-expo/shared-ui': path.join(__dirname, '..', 'my-shared-ui'),
    'react': path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
  });

  return config;
};
