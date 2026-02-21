import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileSettingsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Progress') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: '#585AD1', // bbam-indigo-main
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,                // remove shadow on android
          shadowOpacity: 0,            // remove shadow on ios
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 32,
          height: 100,
        },
        tabBarLabelStyle: {
          // m3 body medium
          fontSize: 14,
          lineHeight: 20,
          letterSpacing: 0.25,
          fontWeight: '400', 
          marginTop: 4,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
