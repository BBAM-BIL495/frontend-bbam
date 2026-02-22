import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableAnimated from '../PressableAnimated';

const CardItem = ({ 
  title,
  subtitle,
  variant = 'workoutDisplay', // 'workoutDisplay', 'exerciseDisplay', 'exerciseAdd', 'exerciseEdit'
  onPress,
  onAdd,
  onDelete,
  onCopy,
  onDrag,
  onUpdateCount,
  exerciseCountType
}) => {
  return (
    <PressableAnimated
      onPress={onPress}
      fade
      baseColor='#E5ECF3'
      activeColor='#E2E8F0'
      disabled={variant !== 'workoutDisplay'}
      className='flex-row items-center bg-bbam-back-card active:bg-slate-200 rounded-2xl overflow-hidden w-full max-h-20'
    >
      {/* Left Image Placeholder */}
      {variant !== 'workoutDisplay' && (
        <View className='bg-white p-4 items-center justify-center w-20 h-full'>
          <Ionicons name='image' size={32} color='#585AD1' />
        </View>
      )}

      <View className='flex-1 flex-row items-center justify-between p-4'>
        {/* Content Area */}
        <View className='flex-col gap-1 justify-center'>
          <Text className='text-m3-title-small font-bold text-bbam-text-main'>
            {title}
          </Text>

          {/* Dynamic Subtitle / Rep or Seconds Counter */}
          {variant === 'exerciseEdit' ? (
            <View className='flex-row gap-2 items-center'>
              <PressableAnimated onPress={() => onUpdateCount(-1)} hitSlop={15} transform>
                <Ionicons name='remove-circle-outline' size={20} color='#585AD1' />
              </PressableAnimated>
              <Text className='text-m3-body-small text-bbam-text-main'>{subtitle}</Text>
              <PressableAnimated onPress={() => onUpdateCount(1)} hitSlop={15} transform>
                <Ionicons name='add-circle-outline' size={20} color='#585AD1' />
              </PressableAnimated>
              <Text className='pl-1 text-m3-body-small text-bbam-text-main'>{exerciseCountType}</Text>
            </View>
          ) : (
            <>
              {variant !== 'exerciseAdd' && (
                <Text className='text-m3-label-medium text-bbam-text-light'>
                  {subtitle}
                </Text> 
              )}
            </>
          )}
        </View>

        {/* Right Action Icons */}
        <View className='flex-row items-center gap-4'>
          {variant === 'workoutDisplay' && (
            <Ionicons name='chevron-forward' size={20} color='#9DA3A9' />
          )}
          {variant === 'exerciseAdd' && (
            <PressableAnimated onPress={onAdd} hitSlop={15} transform>
              <Ionicons name='add' size={24} color="#585AD1" />
            </PressableAnimated>
          )}
          {variant === 'exerciseEdit' && (
            <>
              <PressableAnimated onPress={onDelete} hitSlop={10} transform>
                <Ionicons name='trash-outline' size={20} color='#ED3241' />
              </PressableAnimated>
              <PressableAnimated onPress={onCopy} hitSlop={10} transform>
                <Ionicons name='copy-outline' size={20} color='#585AD1' />
              </PressableAnimated>
              <PressableAnimated onPress={onDrag} hitSlop={10} transform>
                <Ionicons name='menu' size={20} color='#585AD1' />
              </PressableAnimated>
            </>
          )}
        </View>
      </View>
    </PressableAnimated>
  );
};

export default CardItem;
