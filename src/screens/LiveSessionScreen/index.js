import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RNMediapipe } from '@thinksys/react-native-mediapipe';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { mapMediaPipeToInternal } from '../../utils/poseMath';
import { usePoseProcessor } from '../../hooks/usePoseProcessor';
import { useExerciseLibrary } from '../../hooks/useExerciseLibrary';

const LiveSessionScreen = ({ navigation, route }) => {
  const { exerciseList = [] } = route.params || {};
  console.log({ exerciseList }); // [{id,mode,name,value(target reps/seconds)}]
  const [landmarks, setLandmarks] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(exerciseList[0] || {});
  const { reps, seconds, feedback, appState, processFrame } = usePoseProcessor(currentExercise.id);
  const { data: exerciseLibrary = {} } = useExerciseLibrary(); // same structure as rules.json but keys are ids
  console.log({ exerciseLibrary });
  const handleLandmarks = (data) => {
    if (data && data.landmarks) {
      const internalLandmarks = mapMediaPipeToInternal(data.landmarks);
      setLandmarks(internalLandmarks);
      processFrame(internalLandmarks);
    }
  };

  const currentConfig = exerciseLibrary[currentExercise.id];

  return (
    <View className="flex-1 bg-black">
      <RNMediapipe
        style={{ flex: 1 }}
        onLandmark={handleLandmarks}
        modelComplexity={2} // 0 lite 1 full 2 heavy
        minDetectionConfidence={0.7}
        minTrackingConfidence={0.7}
        face={false}
        leftArm={true}
        rightArm={true}
        leftWrist={true}
        rightWrist={true}
        torso={true}
        leftLeg={true}
        rightLeg={true}
        leftAnkle={true}
        rightAnkle={true}
      />

      <Svg style={StyleSheet.absoluteFill}>
        {landmarks && Object.keys(landmarks).map((id) => (
           <Circle 
             key={id}
             cx={landmarks[id].x * 100 + "%"} 
             cy={landmarks[id].y * 100 + "%"} 
             r="4" 
             fill={feedback === "Looking good!" || feedback === "Perfect!" ? "#00FF00" : "#FF0000"} 
           />
        ))}
      </Svg>

      <View className="absolute top-12 left-6">
        <TouchableOpacity 
          testID="close-button"
          onPress={() => navigation.goBack()}
          className="bg-white/20 p-3 rounded-full"
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>
      
      <View className="absolute bottom-20 self-center bg-bbam-indigo-main/80 px-6 py-4 rounded-3xl">
        <Text className="text-white font-bold text-center text-m3-headline-medium">
          {appState === 'CALIBRATING' 
            ? "CALIBRATING" 
            : (currentConfig.mode === 'reps' ? reps : `${seconds}s`)}
        </Text>
        <Text className="text-white text-center text-m3-body-small">
          {feedback}
        </Text>
      </View>
      
    </View>
  );
};

export default LiveSessionScreen;