import { getIntervalNote, getNoteInHertz, getTransposedNote, NOTES } from './music';

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
