import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import OnboardingScreen from '../screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';

global.fetch = jest.fn();

const component = (
  <NavigationContainer>
    <OnboardingScreen />
  </NavigationContainer>
);

describe('OnboardingScreen', () => {
  const switchToSignup = () => {
    const signupLink = screen.getByText(/sign up/i);
    fireEvent.press(signupLink);
    expect(screen.getByText(/create an account/i)).toBeTruthy();
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('OnboardingScreen Validation (UT-01)', () => {
    it('UT-01a: shows error for invalid email', () => {
      render(component);
      switchToSignup();

      const emailInput = screen.getByPlaceholderText(/name@email.com/i);
      const continueButton = screen.getByRole('button', { name: /continue/i });

      fireEvent.changeText(emailInput, 'invalid_random_text');
      fireEvent.press(continueButton);

      expect(Alert.alert).toHaveBeenCalledWith("Invalid Input", "Email is invalid");
    });

    it('UT-01b: shows error for short password', () => {
      render(component);
      switchToSignup();

      const emailInput = screen.getByPlaceholderText(/name@email.com/i);
      const passwordInput = screen.getByPlaceholderText(/Create a password/i);
      const continueButton = screen.getByRole('button', { name: /continue/i });

      // provide valid email to get past the first check
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'test');
      
      fireEvent.press(continueButton);

      expect(Alert.alert).toHaveBeenCalledWith(
        "Weak Password", 
        expect.stringContaining("at least 8 characters long")
      );
    });

  });

  it('UT-02: transitions to setup view after successful 200 OK response', async () => {
    // mocking a successful API response
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ success: true, user: { id: '123' } }),
    });

    render(component);
    switchToSignup();

    fireEvent.changeText(screen.getByPlaceholderText(/name@email.com/i), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText(/Create a password/i), 'SecurePass123!');
    fireEvent.changeText(screen.getByPlaceholderText(/Confirm password/i), 'SecurePass123!');
    fireEvent.press(screen.getByText(/privacy policy/i));
    const continueButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.press(continueButton);

    // wait for the UI to reflect the state change (setup view)
    await waitFor(() => {
      expect(screen.getByText(/set up your account/i)).toBeTruthy(); 
    });
  });
});