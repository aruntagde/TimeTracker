// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import AddEditTask from '../screens/AddEditTask';

const Stack = createStackNavigator();

function NavigationComponent() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen name="AddEditTask" component={AddEditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationComponent;