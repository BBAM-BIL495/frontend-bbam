import { performance } from 'perf_hooks';
import { evaluateForm } from '../utils/ruleEngine';
import { feedbackProvider } from '../utils/feedback';
import { generateFullBodyMock } from '../utils/testUtils';
import { mapMediaPipeToInternal, calculateAngle } from '../utils/poseMath';
import exerciseRules from '../utils/rules.json';

describe('Performance Benchmarks (PT-01, PT-02 & PT-05)', () => {
  const ITERATIONS = 100;

  test('PT-01: evaluateForm should process a frame in under 100ms', () => {
    const mockLandmarks = generateFullBodyMock([24, 26, 28], [170]);
    
    const startTime = performance.now();
    
    for (let i = 0; i < ITERATIONS; i++) {
      evaluateForm(mockLandmarks, 'Squat');
    }
    const averageTime = (performance.now() - startTime) / ITERATIONS;

    console.log(`PT-01 Average Processing Time: ${averageTime.toFixed(4)}ms`);
    expect(averageTime).toBeLessThan(100);
  });

  test('PT-02: processFeedback should trigger within 200ms of error detection', () => {
    const mockEvaluation = {
      isCorrect: false,
      errorType: 'S-01',
      message: 'Squat depth is off!'
    };

    feedbackProvider.lastFeedbackTime = 0;
    const startTime = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      feedbackProvider.lastFeedbackTime = 0; 
      feedbackProvider.processFeedback(mockEvaluation);
    }
    const averageTime = (performance.now() - startTime) / ITERATIONS;

    console.log(`PT-02 Average Feedback Latency: ${averageTime.toFixed(4)}ms`);
    expect(averageTime).toBeLessThan(200);
  });

  test('PT-05: E2E coaching loop latency check', () => {
    const rawLandmarks = [{ x: 0.5, y: 0.5, visibility: 0.9 }];
    const startTime = performance.now();
    const internalLandmarks = mapMediaPipeToInternal(rawLandmarks);
    const evaluation = evaluateForm(internalLandmarks, 'Squat');
    feedbackProvider.processFeedback(evaluation);
    
    const totalTime = performance.now() - startTime;
    console.log(`PT-05 E2E Total Latency: ${totalTime.toFixed(4)}ms`);
    expect(totalTime).toBeLessThan(300);
  });
});

describe('Egzersiz Mantık ve Rep Sayacı Testleri', () => {
  test('SQUAT: Tam bir tekrar sayılmalı (Descending)', () => {
    const config = exerciseRules['Squat'];
    let isAtBottom = false;
    let reps = 0;
    const angles = [170, 150, 120, 80, 120, 170];

    angles.forEach(angle => {
      if (angle < config.repConfig.midThreshold && !isAtBottom) {
        isAtBottom = true;
      } else if (angle > config.repConfig.startThreshold && isAtBottom) {
        reps++;
        isAtBottom = false;
      }
    });

    expect(reps).toBe(1);
    expect(isAtBottom).toBe(false);
  });

  test('PLANK: Form bozulduğunda isCorrect false dönmeli', () => {
    // Koordinatları değiştirerek 180 derece yerine bükülmüş (yaklaşık 140 derece) bir açı oluşturduk
    const brokenPlankLandmarks = {
      12: { x: 0.5, y: 0.2, visibility: 1 }, // Omuz
      24: { x: 0.6, y: 0.5, visibility: 1 }, // Kalça (X ekseninde kaydırıldı, bükülme sağlandı)
      28: { x: 0.5, y: 0.8, visibility: 1 }  // Ayak
    };

    const evaluation = evaluateForm(brokenPlankLandmarks, 'Plank');
    
    // Artık açı 170'in altında kalacağı için isCorrect false dönecektir
    expect(evaluation.isCorrect).toBe(false);
    expect(evaluation.message).toContain("Lower your hips");
  });

  test('JUMPING-JACK: Kollar yukarı kalkınca peak sayılmalı (Ascending)', () => {
    const config = exerciseRules['Jumping-Jack'];
    let isAtPeak = false;
    let reps = 0;
    const angles = [40, 100, 160, 100, 40];

    angles.forEach(angle => {
      if (angle > config.repConfig.midThreshold && !isAtPeak) {
        isAtPeak = true;
      } else if (angle < config.repConfig.startThreshold && isAtPeak) {
        reps++;
        isAtPeak = false;
      }
    });

    expect(reps).toBe(1);
  });
});