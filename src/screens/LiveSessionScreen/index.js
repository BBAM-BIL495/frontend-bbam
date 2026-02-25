import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RNMediapipe } from '@thinksys/react-native-mediapipe';
import { Ionicons } from '@expo/vector-icons';

const PoseDetectionScreen = ({ navigation }) => {
  const handleLandmarks = (data) => {
    console.log("Landmarks detected:", data);
  };

  return (
    <View className="flex-1 bg-black">
      <RNMediapipe
        style={{ flex: 1 }}
        onLandmark={handleLandmarks}
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

      {/* Standard Body & Beyond Overlay */}
      <View className="absolute top-12 left-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-white/20 p-3 rounded-full"
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PoseDetectionScreen;
