import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import PressableAnimated from '../PressableAnimated';

const Button = ({ title, onPress, variant = 'primary', className = '', isLoading = false}) => {
  const isPrimary = variant === 'primary';

  return (
    <PressableAnimated
      onPress={onPress}
      fade
      baseColor={isPrimary ? '#585AD1' : 'white'} // bbam-indigo-main - white
      activeColor={isPrimary ? '#473EB4' : '#F3F4F6'} // bbam-indigo-dark - gray-100
      className={`w-full p-4 rounded-2xl items-center justify-center ${isPrimary ? '' : 'border-[1.5px] border-bbam-indigo-main'} ${className}`}
      accessibilityRole='button'
    >
      {isLoading ? (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator size="small" color={isPrimary ? 'white' : '#585AD1'}/>
        </View>
      ) : (
        <Text className={`h-6 text-center text-m3-body-large font-bold ${isPrimary ? 'text-white' : 'text-bbam-indigo-main'}`}>
          {title}
        </Text>
      )}
    </PressableAnimated>
  );
};

export default Button;
