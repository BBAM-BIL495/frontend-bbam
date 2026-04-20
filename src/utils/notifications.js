import { Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";

const reminderKey = (planId) => `reminder_enabled_${planId}`;

// Persist whether a plan has an active reminder (survives app restarts)
export const saveReminderState = async (planId, isEnabled) => {
  try {
    await AsyncStorage.setItem(reminderKey(planId), isEnabled ? "1" : "0");
  } catch (e) {
    console.log("[Reminder] saveReminderState error:", e?.message);
  }
};

// Returns true if a reminder was previously saved as enabled for this plan
export const loadReminderState = async (planId) => {
  try {
    const val = await AsyncStorage.getItem(reminderKey(planId));
    return val === "1";
  } catch {
    return false;
  }
};

export const requestPermissionWithAlert = () => {
  return new Promise((resolve) => {
    Alert.alert(
      "Permission Required",
      "You have disabled notifications. Please enable them in Settings to get notified about your workouts.",
      [
        {
          text: "Cancel",
          onPress: () => resolve(false),
          style: "cancel",
        },
        {
          text: "Open Settings",
          onPress: async () => {
            await Linking.openSettings();
            resolve(true);
          },
        },
      ],
      { cancelable: false },
    );
  });
};
