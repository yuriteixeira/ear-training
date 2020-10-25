export const NOTES = {
  A: 0,
  Bb: 1,
  B: 2,
  C: 3,
  Db: 4,
  D: 5,
  Eb: 6,
  E: 7,
  F: 8,
  Gb: 9,
  G: 10,
  Ab: 11,
};

export const SCALES = {
  MAJOR: [2, 2, 1, 2, 2, 2, 1],
};

export function getNoteInHertz(note) {
  return Number((Math.pow(2, note / 12) * 440).toFixed(2));
}

export function getTransposedNote(note, octaveFromCentral = 0) {
  return note + octaveFromCentral * 12;
}

export function getIntervalNote(interval, note, scale = SCALES.MAJOR) {
  // 0 based index - interval ones is internally 0
  const target = interval - 1;

  // since 0 is the 1st interval, it means it's the same note
  if (target < 0) return note;

  // find the note given an interval, based in how many steps/jumps are necessary
  const intervalSum = scale.reduce((sum, jumps, idx) => (idx > target ? sum : sum + jumps), 0);
  return note + intervalSum;
}
