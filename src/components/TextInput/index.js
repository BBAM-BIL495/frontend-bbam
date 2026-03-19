import React, { useState } from 'react';
import { View, Text, TextInput as NativeInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TextInput = ({ label, placeholder, isPassword, value, onChangeText, keyboardType = 'default' }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex gap-2">
      {label && <Text className="text-m3-body-medium font-bold text-bbam-text-main mb-1 ml-1">{label}</Text>}
      <View className="w-full flex-row items-center border border-bbam-text-light focus:border-[1.5px] focus:border-bbam-indigo-main rounded-2xl bg-white py-2 px-4">
        <NativeInput
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          className="h-12 flex-1 text-m3-body-medium text-bbam-text-main bg-white"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor='#9DA3A9'
          cursorColor="#585AD1"
          selectionColor="#585AD1"
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={10}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color='#9DA3A9' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextInput;
