import exerciseRules from './rules.json';
export const generateMasterChain = (jointIds, angles, startAngle = 90) => {
  const landmarks = {};
  const segmentLength = 0.3;
  let currentPos = { x: 0.5, y: 0.2 };
  let currentHeading = startAngle;
  landmarks[jointIds[0]] = { ...currentPos, x: currentPos.x, y: currentPos.y, visibility: 1 };
  
  for (let i = 0; i < jointIds.length - 1; i++) {
    const nextJointId = jointIds[i + 1];
    
    const rad = (currentHeading * Math.PI) / 180;
    currentPos = {
      x: currentPos.x + segmentLength * Math.cos(rad),
      y: currentPos.y + segmentLength * Math.sin(rad)
    };
    
    landmarks[nextJointId] = { ...currentPos, visibility: 1 };
    const turnAngle = angles[i] !== undefined ? angles[i] : 180;
    currentHeading = currentHeading + (180 - turnAngle);
  }

  return landmarks;
};

export const generateFullBodyMock = (jointIds, angles) => {
  const rightSide = generateMasterChain(jointIds, angles);
  const leftJoints = jointIds.map(id => id - 1);
  const leftSide = generateMasterChain(leftJoints, angles);
  Object.keys(leftSide).forEach(id => leftSide[id].visibility = 0.1);
  return { ...rightSide, ...leftSide };
};

export const generatePoseFromRules = (exerciseType, angleMap) => {
  const rules = exerciseRules[exerciseType].rules;
  const landmarks = {};
  rules.forEach(rule => {
    const jointIds = rule.joints;
    const targetAngle = angleMap[rule.id] || 90;
    const segment = generateMasterChain(jointIds, [targetAngle]);
    Object.assign(landmarks, segment);
  });

  return landmarks;
};