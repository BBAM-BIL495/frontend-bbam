import { calculateAngle } from './poseMath';
import exerciseRules from './rules.json';

export const evaluateForm = (landmarks, exerciseType) => {
  const feedback = { message: "Looking good!", isCorrect: true, errorType: null };
  const currentExercise = exerciseRules[exerciseType];

  if (!currentExercise || !landmarks) return feedback;
  for (const rule of currentExercise.rules) {
    let jointsToUse = rule.joints;
    const getLeftMirror = (joints) => joints.map(id => (id % 2 === 0 ? id - 1 : id));
    const getRightMirror = (joints) => joints.map(id => (id % 2 !== 0 ? id + 1 : id));
    const leftJoints = getLeftMirror(rule.joints);
    const rightJoints = getRightMirror(rule.joints);
    const leftVis = leftJoints.reduce((acc, id) => acc + (landmarks[id]?.visibility || 0), 0);
    const rightVis = rightJoints.reduce((acc, id) => acc + (landmarks[id]?.visibility || 0), 0);
    jointsToUse = rightVis >= leftVis ? rightJoints : leftJoints;

    const p1 = landmarks[jointsToUse[0]];
    const p2 = landmarks[jointsToUse[1]];
    const p3 = landmarks[jointsToUse[2]];

    if (!p1 || !p2 || !p3) continue;

    const angle = calculateAngle(p1, p2, p3);
    const isMinError = rule.minAngle !== undefined && angle < rule.minAngle;
    const isMaxError = rule.maxAngle !== undefined && angle > rule.maxAngle;

    if (isMinError || isMaxError) {
      feedback.message = rule.message;
      feedback.isCorrect = false;
      feedback.errorType = rule.id;
      break;
    }
  }

  return feedback;
};