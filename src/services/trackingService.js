import api from '../api';

export const createSession = async (planId, planName) => {
  const { data } = await api.post('/tracking/sessions/', {
    ...(planId != null && { plan: planId }),
    ...(planName != null && { plan_name: planName }),
  });
  return data;
};

export const endSession = async (sessionId, exercises = [], durationMinutes) => {
  const { data } = await api.post(`/tracking/sessions/${sessionId}/end/`, {
    exercises,
    ...(durationMinutes != null && { duration_minutes: durationMinutes }),
  });
  return data;
};

export const getSessionHistory = async () => {
  const { data } = await api.get('/tracking/sessions/');
  return data;
};

export const getFeedback = async (sessionId) => {
  const { data } = await api.get(`/feedback/?session_id=${sessionId}`);
  return data;
};
