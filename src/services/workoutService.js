import api from '../api';

export const getWorkoutPlans = async () => {
  const { data } = await api.get('/workout/plans/');
  return data;
};

export const getWorkoutPlanDetail = async (planId) => {
  const { data } = await api.get(`/workout/plans/${planId}/`);
  return data;
};
