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
}

export function transposedNote(note, octaveFromCentral = 0) {
  return note + (octaveFromCentral * 12);
}

export function intervalNote(interval, note, scale = SCALES.MAJOR) {
  const target = interval - 1;
  if (target < 0) return note;
  const intervalSum = scale.reduce((sum, jumps, idx) => idx > target ? sum : sum + jumps, 0);
  return note + intervalSum;
}

export function noteInHertz(note) {
  return Number((Math.pow(2, note / 12) * 440).toFixed(2));
}

export function playNote(note, time = 500) {
  const c = new AudioContext();
  const o = c.createOscillator();
  o.frequency.setTargetAtTime(noteInHertz(note), c.currentTime, 0);
  o.connect(c.destination);
  o.start(0);

  return new Promise((resolve) => {
    setTimeout(() => {
      c.close();
      resolve();
    }, time)
  })
}

