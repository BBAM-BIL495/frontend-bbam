import { evaluateForm } from '../utils/ruleEngine';
import { feedbackProvider } from '../utils/feedback';
import { generateMockLandmarks } from '../utils/testUtils';
import { performance } from 'perf_hooks';
import { mapMediaPipeToInternal } from '../utils/poseMath';

describe('Performance Benchmarks (PT-01 & PT-02)', () => {
  
  const ITERATIONS = 100;

  test('PT-01: evaluateForm should process a frame in under 100ms', () => {
    const jointIds = [24, 26, 28];
    const mockLandmarks = generateMockLandmarks(jointIds, 45);
    
    const startTime = performance.now();
    
    for (let i = 0; i < ITERATIONS; i++) {
      evaluateForm(mockLandmarks, 'Squat');
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / ITERATIONS;

    console.log(`PT-01 Average Processing Time: ${averageTime.toFixed(4)}ms`);
    expect(averageTime).toBeLessThan(100);
  });

  test('PT-02: processFeedback should trigger within 200ms of error detection', () => {
    const mockEvaluation = {
      isCorrect: false,
      errorType: 'S-01',
      message: 'Squat depth is off! Stay between 60-90 degrees.'
    };

    feedbackProvider.lastFeedbackTime = 0;
    const startTime = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      feedbackProvider.lastFeedbackTime = 0; 
      feedbackProvider.processFeedback(mockEvaluation);
    }
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / ITERATIONS;

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
    expect(totalTime).toBeLessThan(300);
  });
});