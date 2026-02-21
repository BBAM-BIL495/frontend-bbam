import { Text, View } from 'react-native';
import Button from '../../components/Button';

const HomeScreen = ({ navigation }) => {
  return (
    <View className='flex-1 gap-4 px-6 items-center justify-center bg-bbam-back-page text-m3-label-large font-normal'>
      <Text>Home Screen</Text>
      <Button title='Go to Login Screen' variant='primary' onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
 
export default HomeScreen;
