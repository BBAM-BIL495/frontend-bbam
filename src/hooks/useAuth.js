import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import * as SecureStore from 'expo-secure-store';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) return null;

      const { data } = await api.get(`/users/profiles/${userId}/`);
      console.log({ userData: data});
      return data;
    },
    retry: false,
  });
};

// 2. The Login Action
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credentials) => {
      // credentials = { email, password }
      const { data } = await api.post('/users/login/', credentials);
      return {
        ...data,
        email: credentials.email,
      };
    },
    onSuccess: async (data) => {
      console.log({ loginData: data });
      await SecureStore.setItemAsync('userToken', data.access);
      await SecureStore.setItemAsync('userId', String(data.user_id)); 
      await SecureStore.setItemAsync('userEmail', data.email);
      
      // invalidate to trigger useUser
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};
