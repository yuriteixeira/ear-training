import { NOTES, getTransposedNote, getIntervalNote, getNoteInHertz, createIntervalQuestion, collectStats } from './engine.js';

it('gets the transposed note index, given a central note and an octave', () => {
  expect(getTransposedNote(NOTES.A, 0)).toBe(0);
  expect(getTransposedNote(NOTES.A, 1)).toBe(12);
  expect(getTransposedNote(NOTES.A, 2)).toBe(24);
  expect(getTransposedNote(NOTES.A, 3)).toBe(36);

  expect(getTransposedNote(NOTES.C, 1)).toBe(15);
});

it('get the interval index, given an initial note index', () => {
  expect(getIntervalNote(0, NOTES.C)).toBe(NOTES.C);
  expect(getIntervalNote(1, NOTES.C)).toBe(NOTES.D);
  expect(getIntervalNote(2, NOTES.C)).toBe(NOTES.E);
  expect(getIntervalNote(3, NOTES.C)).toBe(NOTES.F);
  expect(getIntervalNote(4, NOTES.C)).toBe(NOTES.G);
  expect(getIntervalNote(5, NOTES.C)).toBe(getTransposedNote(NOTES.A, 1));
  expect(getIntervalNote(6, NOTES.C)).toBe(getTransposedNote(NOTES.B, 1));
  expect(getIntervalNote(7, NOTES.C)).toBe(getTransposedNote(NOTES.C, 1));
});

it('gets frequencies for notes', () => {
  expect(getNoteInHertz(NOTES.A)).toBe(440);
  expect(getNoteInHertz(NOTES.B)).toBe(493.88);
  expect(getNoteInHertz(NOTES.C)).toBe(523.25);
  expect(getNoteInHertz(getTransposedNote(NOTES.A, 1))).toBe(880);
  expect(getNoteInHertz(getTransposedNote(NOTES.A, -1))).toBe(220);
});

it('generates an interval question', () => {
  const result = createIntervalQuestion();
  expect(result).toEqual(expect.any(Object));
  expect(result).toHaveProperty('tonic');
  expect(result).toHaveProperty('interval');
  expect(result.tonic).toHaveProperty('note');
  expect(result.tonic).toHaveProperty('octave');
  expect(result.interval).toHaveProperty('number');
  expect(result.interval).toHaveProperty('note');
  expect(result.interval).toHaveProperty('octave');
  expect(result.interval.note).toBe(getTransposedNote(getIntervalNote(result.interval.number, result.tonic.note), result.interval.octave));
});

it('aggregates stats', () => {
  const time = Date.now();

  const rightQuestion = {
    start: time + 1000,
    end: time + 2000,
    interval: { number: 0 },
    choice: 0,
  };

  const wrongQuestion = {
    start: time + 3000,
    end: time + 5000,
    interval: { number: 7 },
    choice: 0,
  };

  const rightButSlowQuestion = {
    start: time + 6000,
    end: time + 10000,
    interval: { number: 0 },
    choice: 0,
  };

  const game = {
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
