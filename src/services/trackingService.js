import api from '../api';

export const createSession = async (planId, startTime) => {
  const formattedStartTime = startTime instanceof Date 
    ? startTime.toISOString() 
    : startTime;
  const formattedDate = startTime instanceof Date 
    ? startTime.toISOString().split('T')[0] 
    : startTime;

  const { data } = await api.post('/tracking/sessions/', {
    ...(planId && { plan: planId }),
    ...(formattedDate && { session_date: formattedDate }),
    ...(formattedStartTime && { started_at: formattedStartTime })
  });
  return data;
};

export const endSession = async (sessionId, payload) => {
  const { data } = await api.post(`/tracking/sessions/${sessionId}/end/`, payload);
  return data;
};

export const deleteSession = async (sessionId) => {
  try {
    const { data } = await api.delete(`/tracking/sessions/${sessionId}/`);
    return data;
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};

export const getSessionHistory = async () => {
  const { data } = await api.get('/tracking/sessions/');
  return data;
};

export const getFeedback = async (sessionId) => {
  const { data } = await api.get(`/feedback/?session_id=${sessionId}`);
  return data;
};
