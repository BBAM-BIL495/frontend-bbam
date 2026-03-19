import { Alert, Linking } from "react-native";


export const requestPermissionWithAlert = () => {
  return new Promise((resolve) => {
    Alert.alert(
      "Permission Required",
      "You have disabled notifications. Please enable them in Settings to get notified about your workouts.",
      [
        { 
          text: "Cancel", 
          onPress: () => resolve(false),
          style: "cancel" 
        },
        { 
          text: "Open Settings", 
          onPress: async () => {
            await Linking.openSettings();
            resolve(true);
          }
        }
      ],
      { cancelable: false }
    );
  });
};