import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { 
  MediapipeCamera, 
  usePoseDetection,
  RunningMode
} from 'react-native-mediapipe';
import { useCameraPermission } from 'react-native-vision-camera';
import { Ionicons } from '@expo/vector-icons';
import PressableAnimated from '../../components/PressableAnimated';

const LiveSessionScreen = ({ navigation }) => {

  const camPerm = useCameraPermission();
  const [permsGranted, setPermsGranted] = useState({ cam: camPerm.hasPermission });
  const askForPermissions = useCallback(() => {
    if (camPerm.hasPermission) {
      setPermsGranted((prev) => ({ ...prev, cam: true }));
    } else {
      camPerm.requestPermission().then((granted) => {
        setPermsGranted((prev) => ({ ...prev, cam: granted }));
      });
    }
  }, [camPerm]);

  const onResults = (results) => {
    console.log(results);
  };

  const onError = (error) => {
    console.log(`error: ${error}`);
  }

  // Initialize the pose detection engine
  const poseDetection = usePoseDetection({
    onResults: onResults,
    onError: onError
  }, RunningMode.LIVE_STREAM, 'pose_model', {
    fpsMode: 30
  });

  if (!permsGranted.cam) {
    return <NeedPermissions askForPermissions={askForPermissions} />;
  }

  return (
    <View className="flex-1 bg-black">
      <MediapipeCamera
        style={StyleSheet.absoluteFill}
        solution={poseDetection}
        activeCamera='front'
      />

      {/* UI Overlay */}
      <View className="absolute top-12 left-6">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-white/20 p-3 rounded-full"
        >
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-10 self-center bg-bbam-primary px-6 py-2 rounded-full">
        <Text className="text-white font-bold text-m3-label-large">AI MONITORING ACTIVE</Text>
      </View>
    </View>
  );
};

const NeedPermissions = ({ askForPermissions }) => {
  return (
    <View className="flex-1 bg-[#FFF0F0] items-center justify-center relative">
      
      {/* Permissions Box */}
      <View className="bg-[#F3F3F3] p-5 rounded-[12px] border border-[#CCCACA] mb-5 mx-6">
        <Text className="text-[20px] font-bold text-black text-center">
          Allow App to use your Camera and Microphone
        </Text>
        <Text className="text-[15px] text-black mt-3 text-center">
          App needs access to your camera in order for Object Detection to work.
        </Text>
      </View>

      {/* Allow Button */}
      <PressableAnimated 
        className="py-[15.5px] px-[25px] rounded-[5px] m-[15px]" 
        onPress={askForPermissions}
        fade
        baseColor='#F95F48'
        activeColor='#cf4b37'
        hitSlop={15}
      >
        <Text className="text-[17px] text-black font-bold">Allow</Text>
      </PressableAnimated>

    </View>
  );
};

export default LiveSessionScreen;