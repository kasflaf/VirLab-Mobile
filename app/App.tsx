// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './index';  // HomeScreen now comes from index.tsx
import LeaderboardScreen from './LeaderboardScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import QuizScreen from './QuizScreen';

export type RootStackParamList = {
  Home: undefined;
  Leaderboard: undefined;
  Login: undefined;
  SignUp: undefined;
  Quiz: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
