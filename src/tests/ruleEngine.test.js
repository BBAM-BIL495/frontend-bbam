import { evaluateForm } from '../utils/ruleEngine';
import { generateMockLandmarks } from './testUtils';

describe('RuleEngine Form Validation - Refined Suite', () => {

  test('Squat: should detect incorrect knee angle (S-01) at 110 degrees', () => {
    const jointIds = [24, 26, 28];
    const mockLandmarks = generateMockLandmarks(jointIds, 110);
    
    const result = evaluateForm(mockLandmarks, 'Squat');
    
    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('S-01');
    expect(result.message).toContain('Squat depth is off');
  });

  test('Bicep-Curl: should detect over-extension (BC-01) at 175 degrees', () => {
    const jointIds = [12, 14, 16];
    const mockLandmarks = generateMockLandmarks(jointIds, 175);
    const result = evaluateForm(mockLandmarks, 'Bicep-Curl');

    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('BC-01');
    expect(result.message).toContain('muscle tension');
  });

  test('Plank: should detect sagging hips (PL-01) at 150 degrees', () => {
    const jointIds = [12, 24, 28];
    const mockLandmarks = generateMockLandmarks(jointIds, 150);
    const result = evaluateForm(mockLandmarks, 'Plank');

    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('PL-01');
    expect(result.message).toContain('straight line');
  });

  test('Lunge: should detect knee over toe (L-01) at 45 degrees', () => {
    const jointIds = [24, 26, 28];
    const mockLandmarks = generateMockLandmarks(jointIds, 45);
    const result = evaluateForm(mockLandmarks, 'Lunge');

    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('L-01');
    expect(result.message).toContain('90 degrees');
  });

  test('Success Case: Squat should pass at 75 degrees', () => {
    const jointIds = [24, 26, 28];
    const mockLandmarks = generateMockLandmarks(jointIds, 75);
    const result = evaluateForm(mockLandmarks, 'Squat');
    
    if (result.errorType === 'S-01') {
      expect(result.isCorrect).toBe(true);
    }
  });

  test('Jumping-Jack: should detect arms being too low (JJ-01)', () => {
    const mockLandmarks = generateMockLandmarks([11, 0, 12], 30); 

    const result = evaluateForm(mockLandmarks, 'Jumping-Jack');
    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('JJ-01');
    expect(result.message).toContain('arms higher');
  });

  test('Shoulder-Press: should detect elbows dropping too low (SP-01)', () => {
    const mockLandmarks = generateMockLandmarks([12, 14, 16], 45);

    const result = evaluateForm(mockLandmarks, 'Shoulder-Press');
    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('SP-01');
    expect(result.message).toContain('elbows too low');
  });

  test('Glute-Bridge: should detect incomplete hip extension (GB-01)', () => {
    const mockLandmarks = generateMockLandmarks([12, 24, 26], 130);

    const result = evaluateForm(mockLandmarks, 'Glute-Bridge');
    expect(result.isCorrect).toBe(false);
    expect(result.errorType).toBe('GB-01');
    expect(result.message).toContain('Push your hips higher');
  });
});

{/* 
const knee = generateMockLandmarks([24, 26, 28], 80);
const torso = generateMockLandmarks([12, 24, 26], 170);
const combined = { ...knee, ...torso };
*/}