import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Auth from './screens/Authentification';
import Home from './screens/home';
import Chat from './screens/chat';
import Signup from './screens/signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Authentification" component={Auth} options={{ headerTitle: 'Entrez vos informations', headerBackVisible: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerTitle: 'Entrez vos informations', headerBackVisible: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>;
}