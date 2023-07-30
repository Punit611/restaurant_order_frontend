import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screen/home';

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
