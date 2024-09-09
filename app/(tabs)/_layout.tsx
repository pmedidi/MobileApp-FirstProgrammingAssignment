import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Index from './index';
import AddPlan from './add-plan';
import Explore from './explore';
import Itinerary from './itinerary';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="Index">
        <Tab.Screen name="Home" component={Index} />
        <Tab.Screen name="Add Plan" component={AddPlan} />
        <Tab.Screen name="Itinerary" component={Itinerary} />
        <Tab.Screen name="Explore" component={Explore} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
