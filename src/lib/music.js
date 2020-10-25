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
  MAJOR: [
    { name: '1', steps: 0 },
    { name: '2', steps: 2 },
    { name: '3', steps: 2 },
    { name: '4', steps: 1 },
    { name: '5', steps: 2 },
    { name: '6', steps: 2 },
    { name: '7', steps: 2 },
    { name: '8', steps: 1 },
  ],

  CHROMATIC: [
    { name: '1', steps: 0 },
    { name: 'b2', steps: 1 },
    { name: '2', steps: 1 },
    { name: 'b3', steps: 1 },
    { name: '3', steps: 1 },
    { name: '4', steps: 1 },
    { name: '4#', steps: 1 },
    { name: '5', steps: 1 },
    { name: 'b6', steps: 1 },
    { name: '6', steps: 1 },
    { name: 'b7', steps: 1 },
    { name: '7', steps: 1 },
    { name: '8', steps: 1 },
  ],
};

export function getNoteInHertz(note) {
  return Number((Math.pow(2, note / 12) * 440).toFixed(2));
}

export function getTransposedNote(note, octaveFromCentral = 0) {
  return note + octaveFromCentral * 12;
}

export function getIntervalNote(intervalIndex, note, scale = SCALES.MAJOR) {
  // since 0 is the 1st interval, it means it's the same note
  if (intervalIndex === 0) return note;

  // find the note given an interval, based in how many steps/jumps are necessary
  const intervalSum = scale.reduce((sum, interval, idx) => (idx > intervalIndex ? sum : sum + interval.steps), 0);
  return note + intervalSum;
}
