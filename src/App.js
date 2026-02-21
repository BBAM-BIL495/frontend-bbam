import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import Button from './components/Button';
import TextInput from './components/TextInput';

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <View className='flex-1 gap-2 items-center justify-center bg-white'>
      <Text>Test app!!!</Text>
      <Button title='Test primary' variant='primary' onPress={() => {}} />
      <Button title='Test secondary' variant='secondary' onPress={() => {}} />
      <TextInput label='test text input' placeholder='type...' isPassword={true} />
      <StatusBar style='auto' />
    </View>
  );
}
