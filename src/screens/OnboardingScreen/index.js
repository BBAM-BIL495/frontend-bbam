import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View className='flex-1 gap-4 items-center justify-center bg-white px-6'>
      <Text>Test app!!!</Text>
      <Button title='Test primary' variant='primary' onPress={() => {}} />
      <Button title='Test secondary' variant='secondary' onPress={() => {}} />
      <TextInput label='test password input' placeholder='type...' isPassword={true} />
      <TextInput label='test text input' placeholder='type...' isPassword={false} />

      <Button 
        title='Go to Main Screen' 
        variant='primary'
        onPress={() => navigation.navigate('MainTabs')} 
      />
      
      <StatusBar style='auto' />
    </View>
  );
}
 
export default OnboardingScreen;
