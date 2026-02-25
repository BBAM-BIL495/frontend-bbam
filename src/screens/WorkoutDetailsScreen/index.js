import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CardItem from '../../components/CardItem';
import Button from '../../components/Button';
import PressableAnimated from '../../components/PressableAnimated';

const WorkoutDetailsScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();

  // mock attributes and methods according to lld
  const [isLocalAlarmScheduled, setIsLocalAlarmScheduled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { workoutPlan } = route.params;
  const { id: planId, totalExercises, estimatedDuration } = workoutPlan;
  
  // exerciseList would normally come from an api call to get workout details
  const exerciseList = [
    { id: '1', name: 'Squat', value: '12 Reps' },
    { id: '2', name: 'Plank', value: '60 Seconds' },
    { id: '3', name: 'Push-Up', value: '10 Reps' },
    { id: '4', name: 'Squat', value: '12 Reps' },
    { id: '5', name: 'Lunge', value: '10 Reps' },
    { id: '6', name: 'Biceps Curl', value: '15 Reps' },
    { id: '7', name: 'Plank', value: '60 Seconds' }
  ];

  const loadWorkoutPlan = (planId) => {};
  const handleStartWorkout = () => {
    console.log('pressed Start Workout');
    navigation.navigate('LiveSession');
  };
  const handleEditWorkout = () => {};
  const handleSetReminder = (time) => {
    setIsLocalAlarmScheduled(previousState => !previousState);
  };
  const scheduleLocalNotification = (time) => {};
  const calculateDuration = () => {};

  return (
    <View className="flex-1 bg-bbam-back-page" style={{ paddingTop: insets.top }}>
      <View className="flex-1 px-6 gap-8">
        {/* Header */}
        <View className="flex-row justify-between items-center pt-4">
          <PressableAnimated onPress={() => navigation.goBack()} hitSlop={15} transform className="p-2 -ml-2">
            <Ionicons name="chevron-back" size={30} color="#585AD1" />
          </PressableAnimated>
          
          <Text className="text-m3-headline-small text-bbam-text-main">
            {workoutPlan.name}
          </Text>
          
          <PressableAnimated onPress={handleEditWorkout} hitSlop={15} transform className="p-2 -mr-2">
            <MaterialCommunityIcons name="pencil" size={30} color="#585AD1" />
          </PressableAnimated>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4 pb-8 border-b-[0.5px] border-[#D4D6DD]">
          <View className="flex-1 bg-bbam-back-card py-4 rounded-3xl items-center justify-center h-24">
            <MaterialCommunityIcons name="dumbbell" size={24} color="#585AD1" />
            <Text className="text-m3-title-small font-bold mt-1">{`${totalExercises} Exercises`}</Text>
          </View>
          <View className="flex-1 bg-bbam-back-card py-4 rounded-3xl items-center justify-center h-24">
            <Ionicons name="time" size={24} color="#585AD1" />
            <Text className="text-m3-title-small font-bold mt-1">{`${estimatedDuration} Minutes`}</Text>
          </View>
        </View>

        {/* 3. SCROLLABLE EXERCISE LIST */}
        <ScrollView
          vertical
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="flex-col gap-2"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {exerciseList.map((item) => (
            <CardItem 
              key={item.id}
              title={item.name}
              subtitle={item.value}
              variant="exerciseDisplay"
            />
          ))}
        </ScrollView> 
      </View>

      {/* 4. STATIC FOOTER (Reminders & Start Button) */}
      <View
        className="bg-white rounded-t-[32px] px-6 pt-8 shadow-lg"
        style={{ paddingBottom: insets.bottom + 20 }}
      >
        <View className="flex-row justify-between items-center mb-8">
          <View className="ml-2">
            <Text className="text-m3-body-medium font-bold text-bbam-text-main">
              Reminders
            </Text>
            <Text className="text-m3-body-small">
              Every Day, 7 PM
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#E5ECF3', true: '#585AD1' }}
            thumbColor="white"
            onValueChange={() => handleSetReminder()}
            value={isLocalAlarmScheduled}
          />
        </View>

        <Button
          title="Start Workout"
          variant="primary"
          className="h-16"
          onPress={handleStartWorkout}
        />
      </View>

    </View>
  );
};

export default WorkoutDetailsScreen;
