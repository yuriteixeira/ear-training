import { NOTES, transposedNote, intervalNote, noteInHertz, createIntervalQuestion, collectStats } from './engine.js';

it('gets the transposed note index, given a central note and an octave', () => {
  expect(transposedNote(NOTES.A, 0)).toBe(0);
  expect(transposedNote(NOTES.A, 1)).toBe(12);
  expect(transposedNote(NOTES.A, 2)).toBe(24);
  expect(transposedNote(NOTES.A, 3)).toBe(36);

  expect(transposedNote(NOTES.C, 1)).toBe(15);
});

it('get the interval index, given an initial note index', () => {
  expect(intervalNote(0, NOTES.C)).toBe(NOTES.C);
  expect(intervalNote(1, NOTES.C)).toBe(NOTES.D);
  expect(intervalNote(2, NOTES.C)).toBe(NOTES.E);
  expect(intervalNote(3, NOTES.C)).toBe(NOTES.F);
  expect(intervalNote(4, NOTES.C)).toBe(NOTES.G);
  expect(intervalNote(5, NOTES.C)).toBe(transposedNote(NOTES.A, 1));
  expect(intervalNote(6, NOTES.C)).toBe(transposedNote(NOTES.B, 1));
  expect(intervalNote(7, NOTES.C)).toBe(transposedNote(NOTES.C, 1));
});

it('gets frequencies for notes', () => {
  expect(noteInHertz(NOTES.A)).toBe(440);
  expect(noteInHertz(NOTES.B)).toBe(493.88);
  expect(noteInHertz(NOTES.C)).toBe(523.25);
  expect(noteInHertz(transposedNote(NOTES.A, 1))).toBe(880);
  expect(noteInHertz(transposedNote(NOTES.A, -1))).toBe(220);
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
  expect(result.interval.note).toBe(transposedNote(intervalNote(result.interval.number, result.tonic.note), result.interval.octave));
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
