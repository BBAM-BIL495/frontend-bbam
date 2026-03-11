import { evaluateForm } from '../utils/ruleEngine';

describe('RuleEngine Form Validation', () => {

  // --- SQUAT TESTS ---
  describe('Squat Validation', () => {
    test('S-01: should detect incorrect knee angle (too shallow or too deep)', () => {
      const mockLandmarks = {
        24: { x: 0.5, y: 0.4 }, // Hip
        26: { x: 0.5, y: 0.7 }, // Knee
        28: { x: 0.9, y: 0.8 }, // Ankle -> Calculates to ~104°, exceeding 90° max
      };
      const result = evaluateForm(mockLandmarks, 'Squat');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('S-01');
      expect(result.message).toContain('Squat depth is off');
    });

    test('S-02: should detect leaning too far forward', () => {
      const mockLandmarks = {
        12: { x: 0.8, y: 0.2 }, // Shoulder (leaning way forward)
        24: { x: 0.5, y: 0.5 }, // Hip
        26: { x: 0.5, y: 0.8 }, // Knee
      };
      const result = evaluateForm(mockLandmarks, 'Squat');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('S-02');
      expect(result.message).toContain('Keep your chest up');
    });
  });

  // --- PUSH-UP TESTS ---
  describe('Push-up Validation', () => {
    test('P-01: should detect sagging hips', () => {
      const mockLandmarks = {
        12: { x: 0.2, y: 0.5 }, // Shoulder
        24: { x: 0.5, y: 0.7 }, // Hip (sagging down)
        28: { x: 0.8, y: 0.5 }, // Ankle
      };
      const result = evaluateForm(mockLandmarks, 'Push-up');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('P-01');
      expect(result.message).toContain('hips sag');
    });

    test('P-02: should detect incorrect elbow depth', () => {
      const mockLandmarks = {
        12: { x: 0.5, y: 0.2 }, // Shoulder
        14: { x: 0.5, y: 0.5 }, // Elbow
        16: { x: 0.8, y: 0.5 }, // Wrist -> 90° (boundary), move Wrist to (0.9, 0.6) for error
      };
      mockLandmarks[16] = { x: 0.9, y: 0.6 }; 
      const result = evaluateForm(mockLandmarks, 'Push-up');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('P-02');
      expect(result.message).toContain('Adjust your depth');
    });
  });

  // --- PLANK TESTS ---
  describe('Plank Validation', () => {
    test('PL-01: should detect high hips (piking)', () => {
      const mockLandmarks = {
        12: { x: 0.2, y: 0.5 }, 
        24: { x: 0.5, y: 0.3 }, // Hip (piked up)
        28: { x: 0.8, y: 0.5 }, 
      };
      const result = evaluateForm(mockLandmarks, 'Plank');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('PL-01');
      expect(result.message).toContain('straight line');
    });
  });

  // --- BICEP CURL TESTS ---
  describe('Bicep-Curl Validation', () => {
    test('BC-01: should warn on over-extension (locked elbows)', () => {
      const mockLandmarks = {
        12: { x: 0.5, y: 0.2 },
        14: { x: 0.5, y: 0.5 },
        16: { x: 0.5, y: 0.8 }, // 180° (Straight arm)
      };
      const result = evaluateForm(mockLandmarks, 'Bicep-Curl');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('BC-01');
      expect(result.message).toContain('muscle tension');
    });

    test('BC-02: should detect over-flexion', () => {
      const mockLandmarks = {
        12: { x: 0.5, y: 0.2 },
        14: { x: 0.5, y: 0.5 },
        16: { x: 0.5, y: 0.3 }, // Very sharp angle (~0-10°)
      };
      const result = evaluateForm(mockLandmarks, 'Bicep-Curl');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('BC-02');
      expect(result.message).toContain('controlled movement');
    });
  });

  // --- LUNGE TESTS ---
  describe('Lunge Validation', () => {
    test('L-01: should detect knee too far forward (over toes)', () => {
      const mockLandmarks = {
        24: { x: 0.5, y: 0.5 }, 
        26: { x: 0.8, y: 0.8 }, // Knee
        28: { x: 0.7, y: 0.8 }, // Ankle behind knee
      };
      const result = evaluateForm(mockLandmarks, 'Lunge');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('L-01');
      expect(result.message).toContain('90 degrees');
    });

    test('L-02: should detect leaning forward', () => {
      const mockLandmarks = {
        12: { x: 0.7, y: 0.3 }, // Shoulder forward
        24: { x: 0.5, y: 0.5 }, 
        26: { x: 0.5, y: 0.8 },
      };
      const result = evaluateForm(mockLandmarks, 'Lunge');
      expect(result.isCorrect).toBe(false);
      expect(result.errorType).toBe('L-02');
      expect(result.message).toContain('torso upright');
    });

    test('Success Case: should return true for perfect Lunge form', () => {
      const mockLandmarks = {
        12: { x: 0.5, y: 0.2 }, // Vertical torso
        24: { x: 0.5, y: 0.5 }, // Hip
        26: { x: 0.5, y: 0.8 }, // Knee
        28: { x: 0.8, y: 0.8 }, // Ankle (Perfect 90°)
      };
      const result = evaluateForm(mockLandmarks, 'Lunge');
      expect(result.isCorrect).toBe(true);
    });
  });
});