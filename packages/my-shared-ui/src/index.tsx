import { FlashList } from '@shopify/flash-list';
import { HttpClientModule, NotificationModule, PlatformModule } from '@tauri-and-expo/shared-bl';
import { StatusBar } from 'expo-status-bar';
import { atom, useAtom, useAtomValue } from 'jotai';
import * as React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface PhotoObject {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const platformAtom = atom(async () => PlatformModule.getPlatform());

const photosAtom = atom<PhotoObject[]>([]);

export const App: React.FC = () => {
  const platformTuple = useAtomValue(platformAtom);
  const [ photos, setPhotos ] = useAtom(photosAtom);

  const sendNotification = React.useCallback(() => {
    NotificationModule.sendNotification('Notification from shared UI', 'How cool is that?');
  }, []);

  const fetchData = React.useCallback(async () => {
    const response = await HttpClientModule.get<PhotoObject[]>('https://jsonplaceholder.typicode.com/photos?albumId=1');

    setPhotos(response.data ?? []);
  }, [ setPhotos ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello from {platformTuple.platform} {platformTuple.os}</Text>
      <Button onPress={sendNotification} title="Send notification" />
      <Button onPress={fetchData} title="Fetch photos" />
      <View style={styles.list}>
        <FlashList
          data={photos}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.item}>
                <View style={styles.itemElement}>
                  <Image source={{ uri: item.url }} style={styles.itemImage} />
                </View>
                <View style={styles.itemElement}>
                  <Text style={styles.itemText}>{item.title} {index}</Text>
                </View>
              </View>
            );
          }}
          estimatedItemSize={200}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 200,
    justifyContent: 'center',
  },
  itemElement: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
    padding: 5,
  },
  itemImage: {
    height: 180,
    width: 180,
  },
  itemText: {
    fontSize: 18,
  },
  list: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
