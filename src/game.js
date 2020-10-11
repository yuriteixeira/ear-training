/*
 * References:
 * - https://medium.com/swinginc/playing-with-midi-in-javascript-b6999f2913c3
 * - https://calculla.com/calculators/table/note_frequencies
 */

let audio;

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

export function startGame() {
  const context = new AudioContext();
  const oscilator = context.createOscillator();
  oscilator.connect(context.destination);
  oscilator.start(0);

  audio = {
    context, oscilator
  }
}

export function createIntervalQuestion() {
  const createTonic = () => {
    const direction = !!parseInt(Math.random) ? 1 : -1;
    const octave = randomNumber(2) * direction;
    const noteNumber = randomNumber(Object.keys(NOTES).length - 1);
    const note = transposedNote(noteNumber, octave);
    return { note, octave };
  };

  const createInterval = (tonic) => {
    const direction = !!parseInt(Math.random) ? 1 : -1;
    const octave = randomNumber(2) * direction;
    const number = randomNumber(7);
    const note = transposedNote(intervalNote(number, tonic.note), octave);
    return { number, note, octave };
  };

  const tonic = createTonic();
  const interval = createInterval(tonic);
  return { tonic, interval };
}

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export async function playIntervalQuestion(intervalQuestion, timePerNote = 500) {
  const { tonic, interval } = intervalQuestion;
  await playNote(tonic.note, timePerNote);
  await playNote(interval.note, timePerNote);
}

export function playNote(note, time = 500) {
  if (!audio.context || !audio.oscilator) throw new Error('Audio engine not initialised.');

  const noteFrequency = noteInHertz(note);
  audio.oscilator.frequency.setTargetAtTime(noteFrequency, audio.context.currentTime, 0);

  return new Promise(resolve => {
    audio.context.resume();

    setTimeout(() => {
      audio.context.suspend();
      resolve();
    }, time)
  })
}