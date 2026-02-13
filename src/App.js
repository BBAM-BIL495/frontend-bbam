import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Button from './components/Button';

export default function App() {
  return (
    <View className='flex-1 gap-2 items-center justify-center bg-white'>
      <Text>Test app!!!</Text>
      <Button title='Test primary' variant='primary' onPress={() => {}} />
      <Button title='Test secondary' variant='secondary' onPress={() => {}} />
      <StatusBar style='auto' />
    </View>
  );
}
