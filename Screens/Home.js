
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import myProfile from './homeScreens/myProfile';
import groups from './homeScreens/groups';
import listProfile from './homeScreens/listProfile';
const Tab = createMaterialBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={myProfile} />
      <Tab.Screen name="Groups" component={groups} />
      <Tab.Screen name="Profile" component={listProfile} />
    </Tab.Navigator>
  )
}