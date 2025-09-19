import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBarColorProvider, useStatusBarColor } from './src/context';
import { Provider, useDispatch } from "react-redux";
import { store } from './src/redux/store';
import { useEffect, useState } from 'react';
import { setLanguageFromStorage } from './src/redux/slices/languageSlice';
import { setAppLanguage } from './src/utils/setLocale';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [ loading, setLoading ] = useState( true );

  useEffect( () => {
    const initLanguage = async () => {
      const languageId = await AsyncStorage.getItem( "languageId" );

      if ( languageId ) {
        dispatch( setLanguageFromStorage( languageId ) );
        setAppLanguage( languageId );
      } else {
        // ✅ No saved language → default to English
        dispatch( setLanguageFromStorage( "1" ) );
        setAppLanguage( "1" );
      }

      setLoading( false );
    };

    initLanguage();
  }, [ dispatch ] );

  if ( loading ) {
    // You can also show a splash / logo here
    return <View style={ { flex: 1, backgroundColor: "#fff" } } />;
  }

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
