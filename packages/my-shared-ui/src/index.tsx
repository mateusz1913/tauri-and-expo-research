import { PlatformModule } from '@tauri-and-expo/shared-bl';
import { StatusBar } from 'expo-status-bar';
import { atom, useAtomValue } from 'jotai';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const platformAtom = atom(async () => PlatformModule.getPlatform());

export const App: React.FC = () => {
  const platformTuple = useAtomValue(platformAtom);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello from {platformTuple.platform} {platformTuple.os}</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
