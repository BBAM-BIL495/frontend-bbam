import React from 'react';
import { Pressable, Text } from 'react-native';

const Button = ({ title, onPress, variant = 'primary', className = ''}) => {
  const isPrimary = variant === 'primary';

  return (
    <Pressable 
      onPress={onPress}
      className={`p-4 rounded-2xl items-center justify-center ${isPrimary ? 'bg-bbam-indigo-main active:bg-bbam-indigo-dark' : 'bg-white active:bg-gray-100 border-[1.5px] border-bbam-indigo-main'} ${className}`}
    >
      <Text className={`text-lg font-bold ${isPrimary ? 'text-white' : 'text-bbam-indigo-main'}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
