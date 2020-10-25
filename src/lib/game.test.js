import { collectStats, createIntervalQuestion } from './game';
import { SCALES } from './music';

it('generates an interval question', () => {
  const result = createIntervalQuestion();
  expect(result).toEqual(expect.any(Object));
  expect(result).toHaveProperty('tonic');
  expect(result).toHaveProperty('interval');
  expect(result.tonic).toHaveProperty('note');
  expect(result.interval).toHaveProperty('index');
  expect(result.interval).toHaveProperty('note');
});

it('aggregates stats', () => {
  const time = Date.now();

  const rightQuestion = {
    start: time + 1000,
    end: time + 2000,
    interval: { index: 0 },
    choice: 0,
  };

  const wrongQuestion = {
    start: time + 3000,
    end: time + 5000,
    interval: { index: 7 },
    choice: 0,
  };

  const rightButSlowQuestion = {
    start: time + 6000,
    end: time + 10000,
    interval: { index: 0 },
    choice: 0,
  };

  const game = {
    scale: SCALES.MAJOR,
    start: time,
    end: time + 10000,
    questions: [rightQuestion, wrongQuestion, rightButSlowQuestion],
  };

  const result = collectStats(game);
  expect(result.date).toEqual(time);
  expect(result.totalTime).toEqual(10000);
  expect(result.totalQuestions).toEqual(3);
  expect(result.totalCorrect).toEqual(2);
  expect(result.totalIncorrect).toEqual(1);
  expect(result.sumTimeToHit).toEqual(5000);
  expect(result.fasterHit).toEqual({ ...rightQuestion, time: 1000, isRecord: false });
  expect(result.slowerHit).toEqual({ ...rightButSlowQuestion, time: 4000, isRecord: false });
  expect(result.avgHit.time).toEqual(2500);
});
