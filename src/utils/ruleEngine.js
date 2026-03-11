import { calculateAngle } from './poseMath';
import exerciseRules from './rules.json';

export const evaluateForm = (landmarks, exerciseType) => {
  const feedback = { message: "Looking good!", isCorrect: true, errorType: null };
  const currentExercise = exerciseRules[exerciseType];

  if (!currentExercise) return feedback;

  for (const rule of currentExercise.rules) {
    const p1 = landmarks[rule.joints[0]];
    const p2 = landmarks[rule.joints[1]];
    const p3 = landmarks[rule.joints[2]];

    if (!p1 || !p2 || !p3) continue;

    const angle = calculateAngle(p1, p2, p3);

    const isError = eval(rule.errorCondition.replace('angle', angle));

    if (isError) {
      feedback.message = rule.message;
      feedback.isCorrect = false;
      feedback.errorType = rule.id;
      break;
    }
  }

  return feedback;
};