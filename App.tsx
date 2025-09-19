import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBarColorProvider, useStatusBarColor } from './src/context';
import { Provider, useDispatch } from "react-redux";
import { store } from './src/redux/store';
import { loadPersistedLanguage } from './src/utils/languagePersist';
import { useEffect } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
      <StatusBarColorProvider>
        <Provider store={ store }>
          <AppContent />
        </Provider>
      </StatusBarColorProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { color } = useStatusBarColor();
  const dispatch = useDispatch();
  useEffect( () => {
    loadPersistedLanguage( dispatch );
  }, [] );
  
  return (
    <View style={ styles.container }>
      <StatusBar backgroundColor={ color } translucent={ false } />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
} );

export default App;
