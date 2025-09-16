import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBarColorProvider, useStatusBarColor } from './src/context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
      <StatusBarColorProvider>
        <AppContent />
        </StatusBarColorProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const { color } = useStatusBarColor();
  return (
    <View style={ styles.container }>
      <StatusBar backgroundColor={ color } translucent={ false } />
      <AppNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
