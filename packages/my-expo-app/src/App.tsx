import { App } from '@tauri-and-expo/shared-ui';
import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function MainEntrypoint() {
  return (
    <React.Suspense
      fallback={
        <View style={styles.container}>
          <ActivityIndicator color="orange" />
        </View>
      }>
      <App />
    </React.Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
});
