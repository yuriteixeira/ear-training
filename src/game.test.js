import { NOTES, transposedNote, intervalNote, noteInHertz, createIntervalQuestion } from './game.js';

it('gets the transposed note index, given a central note and an octave', () => {
  expect(transposedNote(NOTES.A, 0)).toBe(0);
  expect(transposedNote(NOTES.A, 1)).toBe(12);
  expect(transposedNote(NOTES.A, 2)).toBe(24);
  expect(transposedNote(NOTES.A, 3)).toBe(36);

  expect(transposedNote(NOTES.C, 1)).toBe(15);
});

it('get the interval index, given an initial note intex', () => {
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
  expect(result.interval.note).toBe(intervalNote(result.interval.number, result.tonic.note));
});