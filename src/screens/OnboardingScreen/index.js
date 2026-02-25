import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const OnboardingScreen = ({ navigation }) => {
  // ===== LLD ATTRIBUTES =====
  const [currentView, setCurrentView] = useState("login"); // 'login' | 'signup' | 'setup'

  // inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [genderInput, setGenderInput] = useState("male");

  // extra fields you already had in UI
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  // LLD attributes (not used for now, but exist)
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deviceUuid, setDeviceUuid] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  const isLogin = currentView === "login";
  const isSignup = currentView === "signup";
  const isSetup = currentView === "setup";

  // ===== UI HELPERS =====
  const Divider = () => (
    <View className="flex-row items-center my-8">
      <View className="flex-1 h-[1px] bg-gray-300" />
      <Text className="mx-3 text-bbam-text-light m3-body-small">
        Or continue with
      </Text>
      <View className="flex-1 h-[1px] bg-gray-300" />
    </View>
  );

  const GoogleButton = () => (
    <View className="items-center">
      <TouchableOpacity
        activeOpacity={0.85}
        className="w-14 h-14 rounded-full items-center justify-center bg-red-500"
        onPress={() => {}}
      >
        <Text className="text-white font-bold text-lg">G</Text>
      </TouchableOpacity>
    </View>
  );

  // ===== LLD METHODS (EMPTY STUBS FOR NOW) =====
  const switchView = (view) => {
    setCurrentView(view);
  };

  const validateInputs = () => {
    // leave empty for now
    return true;
  };

  const registerDeviceWithBackend = async () => {
    // leave empty for now
  };

  const handleLogin = async () => {
    // DIRECT LOGIN (as you requested)
    navigation.navigate("MainTabs");
  };

  const handleSignup = async () => {
    // NO LOGIC: just go to setup
    switchView("setup");
  };

  const handleSetupComplete = async () => {
    // DIRECT FINISH
    navigation.navigate("MainTabs");
  };

  return (
    <View className="flex-1 bg-bbam-back-page">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ===== HERO (LOGIN ONLY) ===== */}
        {isLogin && (
          <View className="w-full h-[300px] bg-bbam-back-card items-center justify-center">
            <View className="w-12 h-12 rounded-lg items-center justify-center mb-4 bg-bbam-indigo-main">
              <Text className="text-white font-bold">▢</Text>
            </View>

            <Text className="text-[34px] font-bold text-bbam-indigo-main">
              Body & Beyond
            </Text>
            <Text className="text-[22px] font-bold text-bbam-indigo-main -mt-1">
              AI Mentor
            </Text>
          </View>
        )}

        {/* ===== CONTENT ===== */}
        <View className="px-6" style={{ paddingTop: isLogin ? 28 : 64 }}>
          {/* ===== LOGIN ===== */}
          {isLogin && (
            <>
              <Text className="text-[34px] font-bold text-center mb-7 text-bbam-text-main">
                Welcome!
              </Text>

              <TextInput
                label=""
                placeholder="Email Address"
                isPassword={false}
                value={emailInput}
                onChangeText={setEmailInput}
              />

              <TouchableOpacity className="items-end mt-2">
                <Text className="font-bold text-bbam-indigo-main">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <View className="mt-4">
                <TextInput
                  label=""
                  placeholder="Password"
                  isPassword={true}
                  value={passwordInput}
                  onChangeText={setPasswordInput}
                />
              </View>

              <View className="mt-6">
                <Button
                  title="Login"
                  variant="primary"
                  onPress={handleLogin}
                  className="rounded-[28px] py-5"
                />
              </View>

              <Divider />
              <GoogleButton />

              <View className="flex-row justify-center mt-8">
                <Text className="text-bbam-text-light">
                  Don’t have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => switchView("signup")}>
                  <Text className="font-bold text-bbam-indigo-main">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ===== SIGNUP ===== */}
          {isSignup && (
            <>
              <Text className="text-[34px] font-bold text-center mb-12 text-bbam-text-main">
                Create an Account
              </Text>

              <Text className="text-[18px] font-bold mb-2 text-bbam-text-main">
                Username
              </Text>
              <TextInput
                label=""
                placeholder="bbamtest"
                isPassword={false}
                value={usernameInput}
                onChangeText={setUsernameInput}
              />

              <View className="mt-6" />
              <Text className="text-[18px] font-bold mb-2 text-bbam-text-main">
                Email Address
              </Text>
              <TextInput
                label=""
                placeholder="name@email.com"
                isPassword={false}
                value={emailInput}
                onChangeText={setEmailInput}
              />

              <View className="mt-6" />
              <Text className="text-[18px] font-bold mb-2 text-bbam-text-main">
                Password
              </Text>
              <TextInput
                label=""
                placeholder="Create a password"
                isPassword={true}
                value={passwordInput}
                onChangeText={setPasswordInput}
              />

              <View className="mt-4">
                <TextInput
                  label=""
                  placeholder="Confirm password"
                  isPassword={true}
                  value={confirmPasswordInput}
                  onChangeText={setConfirmPasswordInput}
                />
              </View>

              {/* Checkbox */}
              <TouchableOpacity
                className="flex-row items-center mt-6"
                activeOpacity={0.85}
                onPress={() => setAcceptedPolicy((v) => !v)}
              >
                <View
                  className={`w-8 h-8 rounded-lg border-2 ${
                    acceptedPolicy
                      ? "bg-bbam-indigo-main border-bbam-indigo-main"
                      : "border-bbam-text-light"
                  }`}
                />
                <Text className="ml-4 text-[16px] text-bbam-text-main">
                  By continuing, you agree to our{" "}
                  <Text className="text-bbam-indigo-main font-bold">
                    Privacy Policy
                  </Text>
                  .
                </Text>
              </TouchableOpacity>

              <View className="mt-10">
                <Button
                  title="Continue"
                  variant="primary"
                  onPress={handleSignup}
                  className="rounded-[28px] py-5"
                />
              </View>

              <Divider />
              <GoogleButton />

              <View className="flex-row justify-center mt-8">
                <Text className="text-bbam-text-light">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => switchView("login")}>
                  <Text className="font-bold text-bbam-indigo-main">
                    Log in
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ===== SETUP ===== */}
          {isSetup && (
            <>
              <TouchableOpacity
                onPress={() => switchView("signup")}
                className="flex-row items-center mb-12"
              >
                <Text className="text-[28px] mr-2 text-bbam-indigo-main">
                  ‹
                </Text>
                <Text className="text-[20px] text-bbam-text-main">Back</Text>
              </TouchableOpacity>

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.9}
                className="text-[34px] font-bold mb-10 text-bbam-text-main"
              >
                Set Up Your Account
              </Text>

              <Text className="text-[18px] font-bold mb-2 text-bbam-text-main">
                Age
              </Text>
              <TextInput
                label=""
                placeholder="21"
                isPassword={false}
                value={ageInput}
                onChangeText={setAgeInput}
              />

              <View className="mt-6" />
              <Text className="text-[18px] font-bold mb-2 text-bbam-text-main">
                Weight
              </Text>
              <TextInput
                label=""
                placeholder=""
                isPassword={false}
                value={weightInput}
                onChangeText={setWeightInput}
              />

              <View className="mt-6" />
              <Text className="text-[18px] font-bold mb-2 text-bbam-text-main">
                Height
              </Text>
              <TextInput
                label=""
                placeholder=""
                isPassword={false}
                value={heightInput}
                onChangeText={setHeightInput}
              />

              <View className="mt-8" />
              <Text className="text-[18px] font-bold mb-4 text-bbam-text-main">
                Gender
              </Text>

              <View className="flex-row">
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setGenderInput("male")}
                  className={`flex-1 py-3.5 rounded-2xl items-center mr-3 ${
                    genderInput === "male"
                      ? "bg-bbam-indigo-main"
                      : "bg-bbam-back-card"
                  }`}
                >
                  <Text
                    className={`text-[18px] font-bold ${
                      genderInput === "male"
                        ? "text-white"
                        : "text-bbam-indigo-main"
                    }`}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setGenderInput("female")}
                  className={`flex-1 py-3.5 rounded-2xl items-center ${
                    genderInput === "female"
                      ? "bg-bbam-indigo-main"
                      : "bg-bbam-back-card"
                  }`}
                >
                  <Text
                    className={`text-[18px] font-bold ${
                      genderInput === "female"
                        ? "text-white"
                        : "text-bbam-indigo-main"
                    }`}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-12">
                <Button
                  title="Sign Up"
                  variant="primary"
                  onPress={handleSetupComplete}
                  className="rounded-[28px] py-5"
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
};

export default OnboardingScreen;
