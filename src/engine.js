/*
 * References:
 * - https://medium.com/swinginc/playing-with-midi-in-javascript-b6999f2913c3
 * - https://calculla.com/calculators/table/note_frequencies
 */

import { Synth } from './synth';

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
};

export function transposedNote(note, octaveFromCentral = 0) {
  return note + octaveFromCentral * 12;
}

export function intervalNote(interval, note, scale = SCALES.MAJOR) {
  // 0 based index - interval ones is internally 0
  const target = interval - 1;

  // since 0 is the 1st interval, it means it's the same note
  if (target < 0) return note;

  // find the note given an interval, based in how many steps/jumps are necessary
  const intervalSum = scale.reduce((sum, jumps, idx) => (idx > target ? sum : sum + jumps), 0);
  return note + intervalSum;
}

export function noteInHertz(note) {
  return Number((Math.pow(2, note / 12) * 440).toFixed(2));
}

export function initEngine() {
  audio = new Synth();
}

export function createIntervalQuestion() {
  const createTonic = () => {
    const direction = !!randomNumber(1) ? 1 : -1;
    const octave = randomNumber(2) * direction;
    const noteNumber = randomNumber(11); // 12 possible notes
    const note = transposedNote(noteNumber, octave);
    return { note, octave };
  };

  const createInterval = tonic => {
    const direction = !!randomNumber(1) ? 1 : -1;
    const octave = randomNumber(2) * direction;
    let number = randomNumber(7); // 8 possible intervals to go from one octave to another
    const note = transposedNote(intervalNote(number, tonic.note), octave);

    // In case the frequency is the same after transposing, the interval should be the same
    if (note === tonic.note) {
      number = 0;
    }

    return { number, note, octave };
  };

  const tonic = createTonic();
  const interval = createInterval(tonic);
  return { tonic, interval };
}

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

export async function playIntervalQuestion(intervalQuestion, timePerNote = 750) {
  const { tonic, interval } = intervalQuestion;
  await playNote(tonic.note, timePerNote);
  await playNote(interval.note, timePerNote);
}

async function playNote(note, time) {
  audio.play(noteInHertz(note));

  return new Promise(resolve => {
    setTimeout(() => {
      audio.stop();
      resolve();
    }, time);
  });
}

// TODO: Tests on all new functions below


export function collectStats(game) {
  const defaults = {
    totalQuestions: 0,
    totalIncorrect: 0,
    totalCorrect: 0,
    sumTimeToHit: 0,
    slowerHit: {},
    fasterHit: {},
    avgHit: {},
    date: game.start,
    totalTime: game.end - game.start,
  };

  if (game.questions.length < 1) return defaults;

  // We need to revert the array before collecting stats (we
  // stacked items on top, so we could easily access the last
  // inserted question through index 0)
  const questions = game.questions.reverse();

  const savedStats = JSON.parse(localStorage.getItem('stats')) || [];

  const recordStats = aggregateRecords(savedStats);

  const gameStats = questions.reduce((acc, question) => {
    acc.totalQuestions++;

    if (question.choice !== question.interval.number) {
      acc.totalIncorrect++;
      return acc;
    }

    acc.totalCorrect++;

    const time = question.end - question.start;
    acc.sumTimeToHit = acc.sumTimeToHit + time;

    const fasterHit = acc.fasterHit && acc.fasterHit.end - acc.fasterHit.start;
    const slowerHit = acc.slowerHit && acc.slowerHit.end - acc.slowerHit.start;

    if (!fasterHit || time < fasterHit) acc.fasterHit = { ...question, time };
    if (!slowerHit || time > slowerHit) acc.slowerHit = { ...question, time };

    return acc;
  }, defaults);

  gameStats.avgHit = {
    time: gameStats.totalCorrect && gameStats.sumTimeToHit / gameStats.totalCorrect,
    start: game.start
  };

  localStorage.setItem('stats', JSON.stringify([...savedStats, gameStats]));

  decorateStatsWithRecords(gameStats, recordStats);

  console.log({ gameStats, historicalStats: recordStats });
  return gameStats;
}

function aggregateRecords(stats) {
  return stats.reduce((acc, stat) => {
    debugger;
    if (!acc.avgHit || stat.avgHit?.time < acc.avgHit?.time) acc.avgHit = stat.avgHit;
    if (!acc.fasterHit || stat.fasterHit?.time < acc.fasterHit?.time) acc.fasterHit = stat.fasterHit;
    if (!acc.slowerHit || stat.slowerHit?.time > acc.slowerHit?.time) acc.slowerHit = stat.slowerHit;
    return acc;
  }, {});
}

function decorateStatsWithRecords(gameStats, historicalStats) {
  gameStats.avgHit.isRecord = gameStats.avgHit?.time < historicalStats.avgHit?.time;
  gameStats.avgHit.lastRecord = historicalStats.avgHit;

  gameStats.fasterHit.isRecord = gameStats.fasterHit?.time < historicalStats.fasterHit?.time;
  gameStats.fasterHit.lastRecord = historicalStats.fasterHit;

  gameStats.slowerHit.isRecord = gameStats.slowerHit?.time > historicalStats.slowerHit?.time;
  gameStats.slowerHit.lastRecord = historicalStats.slowerHit;
}

export function formatTime(ms) {
  if (!ms) return '???';
  const seconds = (ms / 1000).toFixed(2);
  return `${seconds}s`;
}

export function getGameProps(game) {
  const hasGameStarted = !!game.start;
  const hasGameEnded = !!game.end;

  const questions = game.questions;
  const question = questions && questions.length > 0 ? questions[0] : undefined;
  const choice = question?.choice;
  const hasMadeChoice = choice !== undefined;
  const isChoiceCorrect = choice === question?.interval?.number;
  return {
    hasGameStarted,
    hasGameEnded,
    questions,
    question,
    hasMadeChoice,
    isChoiceCorrect,
  };
}

export async function addQuestion(game, setGameState) {
  const newQuestion = createIntervalQuestion();
  game.questions.unshift(newQuestion);
  setGameState({ ...game });

  await playIntervalQuestion(game.questions[0]);

  game.questions[0].hasPlayed = true;
  game.questions[0].start = Date.now();
  setGameState({ ...game });
}
