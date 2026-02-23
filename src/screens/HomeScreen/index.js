import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CardItem from '../../components/CardItem';
import Button from '../../components/Button';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // mock attributes and methods according to lld
  const userProfile = {
    username: 'bbamtest'
  }

  const workoutPlans = [
    { id: '1', name: 'My Daily Workout', totalExercises: 5, estimatedDuration: 45 },
    { id: '2', name: 'Legs', totalExercises: 4, estimatedDuration: 20 },
    { id: '3', name: 'Arms', totalExercises: 3, estimatedDuration: 15 },
    { id: '4', name: 'Test 1', totalExercises: 5, estimatedDuration: 45 },
    { id: '5', name: 'Test 2', totalExercises: 4, estimatedDuration: 20 },
    { id: '6', name: 'Test 3', totalExercises: 3, estimatedDuration: 15 },
  ];

  const totalWorkouts = 6;
  const totalTimeSpent = 5;

  const loadWorkoutPlans = () => {};
  const loadUserProfile = () => {};
  const navigateToCreateWorkout = () => {};
  const navigateToWorkoutDetails = (workout) => {
    navigation.navigate('WorkoutDetails', {
      workoutPlan: workout
    });
  };

  return (
    <View className="flex-1 bg-bbam-back-page" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="flex-1 px-6 pt-10">
        
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-10">
          <View className='ml-2'>
            <Text className="text-m3-headline-medium text-bbam-text-main">
              {`Hi, ${userProfile.username}`}
            </Text>
            <Text className="text-m3-label-large text-bbam-text-main">
              Ready for a workout?
            </Text>
          </View>
          <View className="w-14 h-14 bg-bbam-back-card rounded-[20px] items-center justify-end overflow-hidden">
            <Ionicons name="person" size={48} color="#585AD1" className='-mb-2' />
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-4 pb-10 border-b-[0.5px] border-[#D4D6DD]">
          <View className="flex-1 bg-bbam-back-card p-4 rounded-3xl items-center justify-center h-32">
            <MaterialCommunityIcons name='arm-flex' size={24} color="#585AD1" />
            <Text className="text-m3-title-small font-bold mt-2">{`${totalWorkouts} Workouts`}</Text>
            <Text className="text-m3-title-small font-bold text-bbam-text-light">Completed</Text>
          </View>
          <View className="flex-1 bg-bbam-back-card p-4 rounded-3xl items-center justify-center h-32">
            <Ionicons name="time" size={24} color="#585AD1" />
            <Text className="text-m3-title-small font-bold mt-2">{`${totalTimeSpent} Hours`}</Text>
            <Text className="text-m3-title-small font-bold text-bbam-text-light">Time Spent</Text>
          </View>
        </View>

        {/* Workouts Section */}
        <Text className="text-m3-title-medium font-bold mt-10 mb-5 ml-2 text-bbam-text-main">
          Your Workouts
        </Text>
        <View className='flex-1 max-h-64'>
          <ScrollView
            vertical
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            contentContainerClassName='flex-col gap-2 w-full'
          >
            {workoutPlans.map((workout) => (
              <CardItem 
                key={workout.id}
                title={workout.name}
                subtitle={`${workout.totalExercises} steps, ${workout.estimatedDuration} mins`}
                variant='workoutDisplay'
                onPress={() => navigateToWorkoutDetails(workout)}
              />
            ))}
          </ScrollView> 
        </View>
        
        {/* Add New Button */}
        <View className='absolute bottom-0 left-6 right-6'>
          <Button
            title={(
              <View className='flex-row items-end justify-center gap-3'>
                <Ionicons name='add' size={24} color='white' />
                <Text className='text-m3-body-large font-bold text-white'>Add New</Text>
              </View>
            )} 
            variant='primary'
            className='h-16'
            onPress={navigateToCreateWorkout}
          />
        </View>

      </View>
    </View>
  );
};

export default HomeScreen;
