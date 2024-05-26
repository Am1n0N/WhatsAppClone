
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Colors from '../constants/Colors';

import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import myProfile from './homeScreens/myProfile';
import Groups from './homeScreens/groups';
import listProfile from './homeScreens/listProfile';

const Tab = createMaterialBottomTabNavigator();

export default function Home(props) {
  const currentid = props.route.params.currentid;
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor={Colors.primary}
      inactiveColor={Colors.gray}
      barStyle={{ backgroundColor: Colors.background }}
    
    >

      <Tab.Screen
        name="Profile"
        component={myProfile}
        Title = "Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={26} color={color} />
          )
        }}
        initialParams={{ currentid: currentid }} />

      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={26} color={color} />
          ),
          headerShown: false,
        }}
        initialParams={{ currentid: currentid }} />

      <Tab.Screen
        name="List Profiles"
        component={listProfile}
        options={{
          title: 'List Profiles',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={26} color={color} />
          ),
          headerShown: false,
        }}
        initialParams={{ currentid: currentid }} />

    </Tab.Navigator>
  )
}