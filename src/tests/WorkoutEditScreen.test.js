import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import { screen, fireEvent, waitFor, within } from '@testing-library/react-native';
import { render } from './testUtils';
import api from '../api';
import WorkoutEditScreen from '../screens/WorkoutEditScreen';

const MOCK_LIBRARY = { 
  1: { id: 1, name: 'Squat', mode: 'reps' },
  2: { id: 2, name: 'Push-up', mode: 'reps' },
  3: { id: 3, name: 'Plank', mode: 'hold' } 
};

jest.mock('../hooks/useExerciseLibrary', () => ({
  useExerciseLibrary: () => ({
    data: MOCK_LIBRARY,
    isLoading: false,
  }),
}));

const mockNavigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
};
const mockRoute = { params: { editMode: false, workoutPlan: {} } };
const component = (
  <NavigationContainer>
    <WorkoutEditScreen route={mockRoute} navigation={mockNavigation} />
  </NavigationContainer>
);

describe('WorkoutEditScreen Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('UT-04: validates inputs and transitions to details on successful save', async () => {
    api.post.mockResolvedValue({ 
      status: 201, 
      data: { id: 'new-plan-123', plan_name: 'test plan', items: [] } 
    });

    const { unmount } = render(component);

    fireEvent.changeText(screen.getByPlaceholderText(/e.g. My Morning Routine/i), 'test plan');

    // 2. Add 3 exercises from library
    const addButtons = screen.getAllByTestId('exercise-add-button');
    fireEvent.press(addButtons[0]);
    fireEvent.press(addButtons[1]);
    fireEvent.press(addButtons[2]);

    // 3. Save
    fireEvent.press(screen.getByText('Save'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/workout/plans/', expect.objectContaining({
        plan_name: 'test plan',
      }));
    });
    unmount();
  });

  it('UT-05: shows error when saving with no exercises', async () => {
    const { unmount } = render(component);

    fireEvent.changeText(screen.getByPlaceholderText(/e.g. My Morning Routine/i), 'test invalid plan');
    
    // Attempt save without adding exercises
    fireEvent.press(screen.getByText('Save'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Error", "Please add at least one exercise.");
      expect(api.post).not.toHaveBeenCalled();
    });
    unmount();
  });

  it('UT-06: verifies reorderExercises updates the list state', async () => {
    // To test reordering, we mock a route with existing exercises
    const editRoute = {
      params: {
        editMode: true,
        workout: {
          id: '1',
          name: 'Edit Plan',
          exerciseList: [
            { id: 1, name: 'Squat', value: '10', mode: 'reps' },
            { id: 2, name: 'Push-up', value: '15', mode: 'reps' },
            { id: 3, name: 'Plank', value: '30', mode: 'hold' },
          ]
        }
      }
    };

    const { unmount } = render(<WorkoutEditScreen navigation={mockNavigation} route={editRoute} />);

    const flatList = screen.getByTestId('draggable-exercise-list');
    
    const newData = [
      { id: 3, name: 'Plank', value: '30', mode: 'hold', instanceId: 'uuid-3' },
      { id: 2, name: 'Push-up', value: '15', mode: 'reps', instanceId: 'uuid-2' },
      { id: 1, name: 'Squat', value: '10', mode: 'reps', instanceId: 'uuid-1' },
    ];

    fireEvent(flatList, 'onDragEnd', { data: newData });

    await waitFor(() => {
      const exerciseCards = screen.getAllByTestId('selected-exercise-card');
      const firstCard = exerciseCards[0];
      const title = within(firstCard).getByText(/Plank/i);
      expect(title).toBeTruthy();
    });
    unmount();
  });
});