import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import WorkoutEditScreen from '../screens/WorkoutEditScreen';
import LiveSessionScreen from '../screens/LiveSessionScreen/index';

import { useUser } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { data: user, isLoading } = useUser();
  const isLoggedIn = user && user.user_name !== null && user.height_cm !== null && user.weight_kg !== null && user.age !== null && user.gender !== null;


  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={OnboardingScreen} options={{ gestureEnabled: false }} />
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name="WorkoutDetails" 
            component={WorkoutDetailsScreen} 
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="WorkoutEdit" 
            component={WorkoutEditScreen} 
            options={{
              presentation: 'fullScreenModal',
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="LiveSession" 
            component={LiveSessionScreen} 
            options={{ gestureEnabled: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootNavigator;
