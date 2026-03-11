import * as Speech from 'expo-speech';

class FeedbackProvider {
  constructor() {
    this.lastFeedbackTime = 0;
    this.feedbackThreshold = 3000;
  }

  processFeedback(evaluation) {
    const currentTime = Date.now();

    if (!evaluation.isCorrect) {
      if (currentTime - this.lastFeedbackTime > this.feedbackThreshold) {
        this.triggerVoiceOutput(evaluation.message);
        this.lastFeedbackTime = currentTime;
      }
      return evaluation.message;
    }

    return "Looking good!";
  }

  triggerVoiceOutput(message) {
    Speech.speak(message, {
      language: 'en',
      pitch: 1.0,
      rate: 1.0,
    });
  }
}

export const feedbackProvider = new FeedbackProvider();