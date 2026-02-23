import { Text, View } from 'react-native';
import Button from '../../components/Button';
import CardItem from '../../components/CardItem';

const ProgressScreen = ({ navigation }) => {
  return (
    <View className='flex-1 gap-4 px-6 items-center justify-center bg-bbam-back-page text-m3-label-large font-normal'>
      <Text>Progress Screen</Text>

      <Text className='text-m3-headline-small'>Example Card Items!!</Text>
      <CardItem
        variant='workoutDisplay'
        title='My Daily Workout'
        subtitle='5 steps, 45 mins'
        onPress={() => console.log('pressed workout plan')}
      />
      <CardItem
        variant='exerciseDisplay'
        title='Squat'
        subtitle='12 Reps'
      />
      <CardItem
        variant='exerciseAdd'
        title='Push-Up'
        onAdd={() => console.log('pressed add exercise')}
      />
      <CardItem
        variant='exerciseEdit'
        title='Daily Workout'
        subtitle='16'
        onPress={() => console.log('pressed')}
        exerciseCountType='Reps'
        onUpdateCount={(change) => console.log(`update ${change}`)}
        onDelete={() => console.log('pressed delete')}
        onCopy={() => console.log('pressed copy')}
        onDrag={() => console.log('pressed drag')}
      />

      <Button title='Go to Login Screen' variant='primary' onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
 
export default ProgressScreen;
