import { calculateAngle } from './poseMath';
import exerciseRules from './rules.json';

export const evaluateForm = (landmarks, exerciseType) => {
  const feedback = { message: "Looking good!", isCorrect: true, errorType: null };
  const currentExercise = exerciseRules[exerciseType];
  if (!currentExercise || !landmarks) return feedback;
  for (const rule of currentExercise.rules) {
    let jointsToUse = rule.joints;
    const hasLeft = rule.joints.some(id => id !== 0 && id % 2 !== 0);
    const hasRight = rule.joints.some(id => id !== 0 && id % 2 === 0);
    const isCrossBody = hasLeft && hasRight;
    if (!isCrossBody) {
      const getLeftMirror = (joints) => joints.map(id => (id === 0 ? 0 : (id % 2 === 0 ? id - 1 : id)));
      const getRightMirror = (joints) => joints.map(id => (id === 0 ? 0 : (id % 2 !== 0 ? id + 1 : id)));
      
      const leftJoints = getLeftMirror(rule.joints);
      const rightJoints = getRightMirror(rule.joints);
      const leftVis = leftJoints.reduce((acc, id) => acc + (landmarks[id]?.visibility || 0), 0);
      const rightVis = rightJoints.reduce((acc, id) => acc + (landmarks[id]?.visibility || 0), 0);
      
      jointsToUse = rightVis >= leftVis ? rightJoints : leftJoints;
    }
    
    const p1 = landmarks[jointsToUse[0]];
    const p2 = landmarks[jointsToUse[1]];
    const p3 = landmarks[jointsToUse[2]];

    if (!p1 || !p2 || !p3) continue;

    const angle = calculateAngle(p1, p2, p3);
    const isMinError = rule.minAngle !== undefined && angle < (rule.minAngle-2);
    const isMaxError = rule.maxAngle !== undefined && angle > (rule.maxAngle+2);
    //Are you adjusting the seat really? That's been your fucking problem the whole time. The seat height. So now you have it, right?
    if (isMinError || isMaxError) {
      feedback.message = rule.message;
      feedback.isCorrect = false;
      feedback.errorType = rule.id;
      break;
    }
  }

  return feedback;
};