# Tauri & Expo research

This a monorepo showcasing how to share code between React Native mobile & web app with Tauri desktop app.

## Packages

- `my-expo-app`

This is React Native mobile (and web) app is bootstrapped with `create-expo-app` and native `android` & `ios` folders are generated with `expo prebuild` command.
It has customized metro and webpack configuration to link shared modules with the root project. Webpack configuration has also customization for parsing typescript shared modules with babel.

- `my-shared-bl`

This is a package with shared business logic. It contains platform specific modules for sending in-app notifications, getting OS information and fetching data with http client.

- `my-shared-ui`

This is a package with shared UI. It contains shared `<App />` component rendering labels, buttons and a list populated with API data.

- `my-tauri-app`

This is Tauri desktop app created with `npx create-tauri-app`
As well as React Native app, it has customized webpack configuration to link shared modules with the root project and parse typescript shared modules with babel. It also customizes webpack resolver to take `.tauri.[ext]` files, so that we can have different implementations depending on the platform (similar to `.android.[ext], .ios.[ext], .web.[ext]` concept known from React Native).
