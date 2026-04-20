import React, { useState, useRef } from 'react';
import { View, Text, Image, Modal, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableAnimated from '../PressableAnimated';
import { exerciseImgs } from '../../utils/exercises';
import Button from '../Button';

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
  exerciseCountType,
  exerciseId,
  description,
  gifUrl
}) => {
  const timerRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isGifLoading, setIsGifLoading] = useState(false);

  const imageSource = exerciseImgs[exerciseId];

  const handlePressIn = (direction) => {
    handlePressOut(); // clear any leaked timers before starting new ones
    onUpdateCount(direction);

    timerRef.current = setTimeout(() => {
      timerRef.current = setInterval(() => {
        onUpdateCount(direction);
      }, 80);
    }, 350);
  };

  const handlePressOut = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <>
      <PressableAnimated
        onPress={onPress}
        fade
        baseColor='#E5ECF3'
        activeColor='#E2E8F0'
        disabled={variant !== 'workoutDisplay'}
        className='flex-row items-center bg-bbam-back-card active:bg-slate-200 rounded-2xl overflow-hidden w-full h-20'
      >
        {/* Left Image Placeholder */}
        {variant !== 'workoutDisplay' && (
          <View className='bg-white p-2 items-center justify-center w-20 h-full'>
            {imageSource ? (
              <Image 
                source={imageSource} 
                className="w-full h-full" 
                resizeMode="contain" 
              />
            ) : (
              // Fallback to icon if ID isn't found in map
              <Ionicons name='image' size={32} color='#585AD1' />
            )}
          </View>
        )}

        <View className='flex-1 flex-row items-center justify-between p-4'>
          {/* Content Area */}
          <View className='flex-col gap-1 justify-center'>
            <View className="flex-row items-center gap-2">
              <Text className='text-m3-title-small font-bold text-bbam-text-main'>
                {title}
              </Text>
              {(variant === 'exerciseAdd' || variant === 'exerciseDisplay') && (
                <PressableAnimated onPress={() => setModalVisible(true)} hitSlop={15} transform>
                  <Ionicons name="information-circle-outline" size={20} color="#585AD1" />
                </PressableAnimated>
              )}
            </View>

            {/* Dynamic Subtitle / Rep or Seconds Counter */}
            {variant === 'exerciseEdit' ? (
              <View className='flex-row gap-3 items-center'>
                <PressableAnimated onPressIn={() => handlePressIn(-1)} onPressOut={handlePressOut} hitSlop={15} transform>
                  <Ionicons name='remove-circle-outline' size={20} color='#585AD1' />
                </PressableAnimated>
                <Text className='text-m3-body-small text-bbam-text-main'>{subtitle}</Text>
                <PressableAnimated onPressIn={() => handlePressIn(1)} onPressOut={handlePressOut} hitSlop={15} transform>
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
              <PressableAnimated onPress={onAdd} hitSlop={15} transform testID="exercise-add-button">
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
                <PressableAnimated onPressIn={onDrag} hitSlop={10} transform>
                  <Ionicons name='menu' size={20} color='#585AD1' />
                </PressableAnimated>
              </>
            )}
          </View>
        </View>
      </PressableAnimated>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent} className="bg-bbam-back-page">
            <View className="flex-row justify-between items-center mb-4 px-2">
              <Text className="text-m3-headline-small font-bold text-bbam-text-main">{title}</Text>
              <PressableAnimated onPress={() => setModalVisible(false) } hitSlop={15} transform>
                <Ionicons name="close" size={28} color="#263238" />
              </PressableAnimated>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="w-full h-64 bg-white rounded-3xl overflow-hidden mb-6 items-center justify-center">
                {gifUrl ? (
                  <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image 
                      source={{ uri: gifUrl }} 
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                      onLoadStart={() => setIsGifLoading(true)} // 3. Set loading to true
                      onLoadEnd={() => setIsGifLoading(false)}   // 4. Set loading to false
                    />
                    {/* 5. Show indicator while isGifLoading is true */}
                    {isGifLoading && (
                      <View style={StyleSheet.absoluteFill} className="items-center justify-center bg-white/50">
                        <ActivityIndicator size="large" color="#585AD1" />
                      </View>
                    )}
                  </View>
                ) : (
                  <View className="items-center">
                    <Ionicons name="play-circle-outline" size={64} color="#C7C9EE" />
                    <Text className="text-bbam-text-light mt-2">No preview available</Text>
                  </View>
                )}
              </View>

              <Text className="text-m3-title-medium font-bold text-bbam-text-main mb-2">How to perform</Text>
              <Text className="text-m3-body-large text-bbam-text-light leading-6 mb-8">
                {description || "No description provided for this exercise."}
              </Text>
              
              <Button title="Got it" variant="primary" onPress={() => setModalVisible(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    borderRadius: 32,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
  },
});

export default React.memo(CardItem);
