// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignUpScreen from '../src/screens/SignUpScreen';
import SignInScreen from '../src/screens/SignInScreen';
import HomeScreen from '../src/screens/HomeScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import ExploreScreen from '../src/screens/ExploreScreen';
import WelcomeScreen from '../src/screens/WelcomeScreen'; // Agrega la importación de WelcomeScreen
import AssistantComponent from '../src/screens/AssistantComponent';
import EditProfileScreen from '../src/screens/EditProfileScreen';
import UserPostsScreen from '../src/screens/UserPostsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome"> 
      <Stack.Screen name="Welcome" component={WelcomeScreen} /> 
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="Assistant" component={AssistantComponent} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="UserPosts" component={UserPostsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
