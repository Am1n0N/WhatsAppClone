
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import myProfile from './homeScreens/myProfile';
import groups from './homeScreens/groups';
import listProfile from './homeScreens/listProfile';
const Tab = createMaterialBottomTabNavigator();
export default function Home(props) {
  const currentid = props.route.params.currentid;
  return (
    <Tab.Navigator>
      <Tab.Screen name="My profile" component={myProfile} initialParams={{currentid: currentid}} />
      <Tab.Screen name="Groups" component={groups} initialParams={{currentid: currentid}}/>
      <Tab.Screen name="List Profiles" component={listProfile} initialParams={{currentid: currentid}} />
    </Tab.Navigator>
  )
}